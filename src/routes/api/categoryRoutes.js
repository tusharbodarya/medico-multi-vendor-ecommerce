import express from 'express';
import { protect } from '../../middlewares/authMiddlewares.js';
import { createCategory, deleteCategory, getCategoryBySlug, getCategories, updateCategory } from '../../controllers/api/categoryController.js';


const categoryRouter = express.Router();

// Create a new category
categoryRouter.post('/', protect, createCategory);

// Get all categories
categoryRouter.get('/all', getCategories);

// Get a category by slug
categoryRouter.get('/:slug', getCategoryBySlug);

// Update a category by id
categoryRouter.put('/:id', protect, updateCategory);

// delete a category by id
categoryRouter.delete('/:id', protect, deleteCategory);


export default categoryRouter;