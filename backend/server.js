import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5001;

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running..');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb'); // Default to 'sb' for sandbox
});

const __dirname = path.resolve(); // Get the current directory 
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Serve static files from the uploads directory

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () =>
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
