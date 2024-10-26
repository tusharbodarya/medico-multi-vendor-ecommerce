import asyncHandler from "express-async-handler";
import { AppError } from "../../middlewares/errorHandler.js";
import { Category } from "../../models/categoryModel.js";

// @desc  Create a new category
// @route POST /api/categories
// @access Private

export const createCategory = asyncHandler(async (req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.status(201).json({ status: true, data: newCategory});
    }catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get all categories
// @route GET /api/categories
// @access Public

export const getCategories = asyncHandler(async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json({ status: true, data: categories });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get a category by slug
// @route GET /api/categories/:slug
// @access Public

export const getCategoryBySlug = asyncHandler(async (req, res) => {
    try{
        const category = await Category.findOne({ slug: req.params.slug });
        if(!category){
            res.status(404);
            throw new AppError("Category not found", 404);
        }
        res.status(200).json({ status: true, data: category });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Update a category
// @route PUT /api/categories/:id
// @access Private

export const updateCategory = asyncHandler(async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!category){
            res.status(404);
            throw new AppError("Category not found", 404);
        }
        res.status(200).json({ status: true, data: category });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Delete a category
// @route DELETE /api/categories/:id
// @access Private

export const deleteCategory = asyncHandler(async (req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            res.status(404);
            throw new AppError("Category not found", 404);
        }
        res.status(200).json({ status: true, data: category });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});