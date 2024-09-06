import mongoose from "mongoose";
import Product from "../models/product.module.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all the products
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // Get the product from the request body

    if (!product.name || !product.price || !product.description || !product.countInStock || !product.imageUrl) {
        return res.status(400).json({ message: "Please fill the all fields" });
    }

    const newProduct = new Product(product); // Add a new product

    try {
        await newProduct.save(); // Save the new product
        res.status(201).json({ success: true, data: newProduct }); // Return the saved product
    } catch (error) {
        console.error("Error in create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }

};

export const updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product id from the request params
    const product = req.body; // Get the product data from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found under this id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }); // Find the product by id and update it
        res.status(200).json({ success: true, data: updatedProduct }); // Return the updated product
    } catch (error) {
        console.error("Error in update product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // Get the product id from the request params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Product not found under this id" });
    }

    try {
        await Product.findByIdAndDelete(id); // Find the product by id
        res.json({ success: true, message: "Product is deleted successfully" });
    } catch (error) {
        console.error("Error in delete product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}