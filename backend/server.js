import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'; // Ensure this path is correct

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept json data in requests, a middleware

app.use('/api/products', productRoutes); // Use the product routes

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running at http://localhost:' + PORT);
})