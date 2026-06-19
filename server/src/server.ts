import express from "express";
import { prisma } from "./lib/prisma.ts";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate the input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
