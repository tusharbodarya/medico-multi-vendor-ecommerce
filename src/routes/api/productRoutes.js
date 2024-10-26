import express from 'express';
import { createProduct, deleteProduct, getProductBySlug, getProducts, updateProduct } from '../../controllers/api/productController.js';
import { protect } from '../../middlewares/authMiddlewares.js';

const productRouter = express.Router();

// Create a new product
productRouter.post('/', protect, createProduct);

// Get all products
productRouter.get('/all', getProducts);

// Get a product by slug
productRouter.get('/:slug', getProductBySlug);

// Update a product by id
productRouter.put('/:id', protect, updateProduct);

// delete a product by id
productRouter.delete('/:id', protect, deleteProduct);


export default productRouter;