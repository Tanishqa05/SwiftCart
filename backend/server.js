import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'; // Ensure this path is correct
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); //allows us to accept json data in requests, a middleware

app.use('/api/products', productRoutes); // Use the product routes

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running at http://localhost:' + PORT);
})