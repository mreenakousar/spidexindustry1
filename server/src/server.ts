import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.ts";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
