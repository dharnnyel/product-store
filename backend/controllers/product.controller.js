import mongoose from 'mongoose';
import Product from '../models/product.model.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error in fetching products');
    res
      .status(500)
      .json({ success: false, message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(`Error deleting product: ${error.message}`);
    res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }
};

export {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
