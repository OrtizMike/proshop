import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
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

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () =>
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
