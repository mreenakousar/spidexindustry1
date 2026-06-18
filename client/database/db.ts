import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { User, UserRole } from "./models/user";
import { Order, OrderDocument } from "./models/order";
import { ContactSubmission } from "./models/contact";
import { RFQSubmission } from "./models/rfq";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, hashPassword } from "./auth";

const dbName = process.env.MONGODB_DB || "speedxindustry";
const runtimeDbPath = path.join(process.cwd(), ".next", "runtime-db.json");

let cachedClient: MongoClient | null = null;
type DatabaseLike = {
  collection<T extends Record<string, any>>(name: string): any;
};

let cachedDb: DatabaseLike | null = null;

type LocalState = {
  users: Array<Record<string, any>>;
  orders: Array<Record<string, any>>;
  contacts: Array<Record<string, any>>;
  rfqs: Array<Record<string, any>>;
};

const emptyState = (): LocalState => ({
  users: [],
  orders: [],
  contacts: [],
  rfqs: [],
});

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

async function readRuntimeState(): Promise<LocalState> {
  try {
    const content = await fs.readFile(runtimeDbPath, "utf8");
    const parsed = JSON.parse(content) as Partial<LocalState>;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
      rfqs: Array.isArray(parsed.rfqs) ? parsed.rfqs : [],
    };
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return emptyState();
    }

    throw error;
  }
}

async function writeRuntimeState(state: LocalState) {
  await fs.mkdir(path.dirname(runtimeDbPath), { recursive: true });
  await fs.writeFile(runtimeDbPath, JSON.stringify(state, null, 2), "utf8");
}

function matchesFilter(document: Record<string, any>, filter: Record<string, any>) {
  return Object.entries(filter).every(([key, value]) => document[key] === value);
}

function applySet(document: Record<string, any>, update: Record<string, any>) {
  if (update.$set && typeof update.$set === "object") {
    Object.assign(document, update.$set);
  }
}

function createLocalCollection<T extends Record<string, any>>(collectionName: keyof LocalState) {
  return {
    async findOne(filter: Record<string, any>) {
      const state = await readRuntimeState();
      const record = state[collectionName].find((document) => matchesFilter(document, filter));
      return record ? clone(record) : null;
    },
    async insertOne(document: T) {
      const state = await readRuntimeState();
      const storedDocument = {
        ...clone(document),
        _id: (document as any)._id || randomUUID(),
      };

      state[collectionName].push(storedDocument);
      await writeRuntimeState(state);

      return { acknowledged: true, insertedId: storedDocument._id };
    },
    async updateOne(filter: Record<string, any>, update: Record<string, any>) {
      const state = await readRuntimeState();
      const record = state[collectionName].find((document) => matchesFilter(document, filter));

      if (!record) {
        return { acknowledged: true, matchedCount: 0, modifiedCount: 0 };
      }

      applySet(record, update);
      await writeRuntimeState(state);

      return { acknowledged: true, matchedCount: 1, modifiedCount: 1 };
    },
    async deleteOne(filter: Record<string, any>) {
      const state = await readRuntimeState();
      const nextRecords = state[collectionName].filter((document) => !matchesFilter(document, filter));
      const deletedCount = state[collectionName].length - nextRecords.length;

      state[collectionName] = nextRecords;
      await writeRuntimeState(state);

      return { acknowledged: true, deletedCount };
    },
    async countDocuments() {
      const state = await readRuntimeState();
      return state[collectionName].length;
    },
    async insertMany(documents: T[]) {
      const state = await readRuntimeState();
      const insertedIds: Record<number, string> = {};

      documents.forEach((document, index) => {
        const storedDocument = {
          ...clone(document),
          _id: (document as any)._id || randomUUID(),
        };

        insertedIds[index] = storedDocument._id;
        state[collectionName].push(storedDocument);
      });

      await writeRuntimeState(state);

      return { acknowledged: true, insertedCount: documents.length, insertedIds };
    },
    find() {
      return {
        async toArray() {
          const state = await readRuntimeState();
          return clone(state[collectionName]);
        },
      };
    },
    async findOneAndUpdate(filter: Record<string, any>, update: Record<string, any>) {
      const state = await readRuntimeState();
      const record = state[collectionName].find((document) => matchesFilter(document, filter));

      if (!record) {
        return { value: null };
      }

      applySet(record, update);
      await writeRuntimeState(state);

      return { value: clone(record) };
    },
  };
}

function createLocalDatabase() {
  return {
    collection<T extends Record<string, any>>(collectionName: keyof LocalState) {
      return createLocalCollection<T>(collectionName);
    },
  } as DatabaseLike;
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  try {
    const client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    const db = client.db(dbName) as DatabaseLike;
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn("MongoDB unavailable, using local runtime store for development.");
    const db = createLocalDatabase();
    cachedClient = null;
    cachedDb = db;
    return { client: null, db };
  }
}

export async function getUsersCollection() {
  const { db } = await connectToDatabase();
  return db.collection<User>("users");
}

export async function getOrdersCollection() {
  const { db } = await connectToDatabase();
  return db.collection<OrderDocument>("orders");
}

export async function getContactsCollection() {
  const { db } = await connectToDatabase();
  return db.collection<ContactSubmission>("contacts");
}

export async function getRfqsCollection() {
  const { db } = await connectToDatabase();
  return db.collection<RFQSubmission>("rfqs");
}

export async function ensureAdminUser() {
  const users = await getUsersCollection();
  const email = DEFAULT_ADMIN_EMAIL;
  const password = DEFAULT_ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";
  const passwordHash = await hashPassword(password);

  const existingAdmin = await users.findOne({ role: "admin" });
  const existingUser = await users.findOne({ email });

  if (existingUser) {
    await users.updateOne(
      { email },
      {
        $set: {
          name,
          passwordHash,
          role: "admin" as UserRole,
        },
      },
    );

    if (existingAdmin && existingAdmin.email !== email) {
      await users.deleteOne({ email: existingAdmin.email });
    }

    return;
  }

  if (existingAdmin) {
    await users.updateOne(
      { email: existingAdmin.email },
      {
        $set: {
          name,
          email,
          passwordHash,
          role: "admin" as UserRole,
        },
      },
    );
    return;
  }

  await users.insertOne({
    name,
    email,
    passwordHash,
    role: "admin",
    createdAt: new Date(),
  });
}

const sampleOrders: Order[] = [
  {
    id: "ORD-5301",
    clientName: "Arcadia Apparel Co.",
    product: "Premium Performance Hoodie",
    quantity: 480,
    country: "United States",
    paymentStatus: "Paid",
    productionStatus: "Printing",
    status: "In Production",
    orderDate: "2026-06-01",
    amount: 37440,
    fabricDetails: "320gsm French terry, moisture-wicking, custom pantone dye.",
    printingDetails: "Sublimation print with reflective ink on chest logo.",
    techPackFile: "Arcadia_Hoodie_Techpack.pdf",
    clientPhone: "+1 415 890 2334",
    billingEmail: "orders@arcadiaapparel.com",
    address: "320 Market St, San Francisco, CA",
    shippingMethod: "Express Sea Freight",
    estimatedDelivery: "2026-07-15",
    paymentMethod: "Wire Transfer",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: true },
      { label: "Fabric Sourcing", completed: true },
      { label: "Cutting", completed: true },
      { label: "Stitching", completed: false },
      { label: "Printing", completed: false },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
  {
    id: "ORD-5294",
    clientName: "Summit Sportswear",
    product: "Team Training Jacket",
    quantity: 960,
    country: "United Kingdom",
    paymentStatus: "Pending",
    productionStatus: "Fabric Sourcing",
    status: "Pending",
    orderDate: "2026-05-28",
    amount: 61440,
    fabricDetails: "Softshell with breathable mesh lining and TPU water-resistant finish.",
    printingDetails: "Heat transfer crest artwork with team numbering.",
    techPackFile: "Summit_Jacket_Techpack.pdf",
    clientPhone: "+44 20 7946 0871",
    billingEmail: "procurement@summitsports.co.uk",
    address: "88 Queen St, London, UK",
    shippingMethod: "Standard Air Freight",
    estimatedDelivery: "2026-07-02",
    paymentMethod: "Credit Card",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: false },
      { label: "Fabric Sourcing", completed: false },
      { label: "Cutting", completed: false },
      { label: "Stitching", completed: false },
      { label: "Printing", completed: false },
      { label: "Embroidery", completed: false },
      { label: "Quality Control", completed: false },
      { label: "Packing", completed: false },
      { label: "Shipping", completed: false },
      { label: "Delivered", completed: false },
    ],
  },
  {
    id: "ORD-5278",
    clientName: "Greenfield Corporate",
    product: "Executive Polo Shirt",
    quantity: 240,
    country: "Bangladesh",
    paymentStatus: "Paid",
    productionStatus: "Completed",
    status: "Completed",
    orderDate: "2026-05-15",
    amount: 13440,
    fabricDetails: "210gsm pique cotton with moisture-wicking finish.",
    printingDetails: "Embroidery on chest and custom woven label.",
    techPackFile: "Greenfield_Polo_Techpack.pdf",
    clientPhone: "+880 1912 345678",
    billingEmail: "purchase@greenfieldcorporate.com",
    address: "House 14, Road 7, Dhaka",
    shippingMethod: "Local Pickup",
    estimatedDelivery: "2026-05-25",
    paymentMethod: "Bank Transfer",
    productionTimeline: [
      { label: "Order Received", completed: true },
      { label: "Quotation Approved", completed: true },
      { label: "Payment Received", completed: true },
      { label: "Fabric Sourcing", completed: true },
      { label: "Cutting", completed: true },
      { label: "Stitching", completed: true },
      { label: "Printing", completed: true },
      { label: "Embroidery", completed: true },
      { label: "Quality Control", completed: true },
      { label: "Packing", completed: true },
      { label: "Shipping", completed: true },
      { label: "Delivered", completed: true },
    ],
  },
];

export async function seedOrdersIfEmpty() {
  const orders = await getOrdersCollection();
  const count = await orders.countDocuments();

  if (count > 0) {
    return;
  }

  const documents = sampleOrders.map((order) => ({
    ...order,
    orderId: order.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await orders.insertMany(documents);
}
