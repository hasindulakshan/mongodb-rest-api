import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // should be .js, if not, it will throw an error
import Product from "./models/product.module.js"; // should be .js, if not, it will throw an error
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // accept json data in the request body

app.use("/api/products", productRoutes); // Use product routes

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on http://localhost:" + PORT);
});