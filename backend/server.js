import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js'; // Ensure this path is correct
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept json data in requests, a middleware

app.get("/api/products", async (req, res) => {
    try {    
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } 
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.post("/api/products", async(req, res) => {
    const product= req.body; //user will send product data in the request body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'PLease provide all fields' });
    }

    const newProduct= new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.put("/api/products/:id", async(req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' });}

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.delete("/api/products/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } 
    catch (error) {
        res.status(404).json({ success: false, message: "Product not found" });
    }
});


app.listen(5000, () => {
    connectDB();
    console.log('Server is running at http://localhost:5000');
})