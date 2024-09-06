import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.module.js"; // Import the Product model, should be .js, if not, it will throw an error
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;