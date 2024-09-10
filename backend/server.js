import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/api/products', async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(404).json({
      success: false,
      message: 'Please fill in all fields',
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, data: newProduct });
  } catch (error) {
    console.error(
      `Error creating new product: ${error.message}`
    );
    res
      .status(500)
      .json({ success: false, message: 'Server Error' });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
