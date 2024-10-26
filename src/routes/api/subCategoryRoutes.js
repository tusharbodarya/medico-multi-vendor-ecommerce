import express from 'express';
import { protect } from '../../middlewares/authMiddlewares.js';
import { createSubCategory, deleteSubCategory, getSubCategories, getSubCategoryBySlug, updateSubCategory } from '../../controllers/api/subCategoryController.js';

const subCategoryRouter = express.Router();

// Create a new subCategory
subCategoryRouter.post('/', protect, createSubCategory);

// Get all subCategories
subCategoryRouter.get('/all', getSubCategories);

// Get a subCategory by slug
subCategoryRouter.get('/:slug', getSubCategoryBySlug);

// Update a subCategory by id
subCategoryRouter.put('/:id', protect, updateSubCategory);

// delete a subCategory by id
subCategoryRouter.delete('/:id', protect, deleteSubCategory);


export default subCategoryRouter;