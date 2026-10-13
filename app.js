require('dotenv').config();

const express = require('express');
const connectDB = require('./configs/database')

const productRoutes = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api', userRoute);
app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});