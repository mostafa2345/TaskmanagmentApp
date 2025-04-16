import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

connectDb(MONGO_URI);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(8000, () => console.log("server is up"));
