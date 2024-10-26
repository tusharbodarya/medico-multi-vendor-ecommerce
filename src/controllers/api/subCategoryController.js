import asyncHandler from "express-async-handler";
import { AppError } from "../../middlewares/errorHandler.js";
import { SubCategory } from "../../models/subCategoryModel.js";

// @desc  Create a new sub category
// @route POST /api/subCategories
// @access Private

export const createSubCategory = asyncHandler(async (req, res) => {
    try{
        const newSubCategory = await SubCategory.create(req.body);
        res.status(201).json({ status: true, data: newSubCategory});
    }catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Get all sub categories
// @route GET /api/subCategories
// @access Public

export const getSubCategories = asyncHandler(async (req, res) => {
    try{
        const subCategories = await SubCategory.find().populate("category");
        res.status(200).json({ status: true, data: subCategories });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get a sub category by slug
// @route GET /api/subCategories/:slug
// @access Public

export const getSubCategoryBySlug = asyncHandler(async (req, res) => {
    try{
        const subCategory = await SubCategory.findOne({ slug: req.params.slug }).populate("category");
        if(!subCategory){
            res.status(404);
            throw new AppError("Sub Category not found", 404);
        }
        res.status(200).json({ status: true, data: subCategory });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Update a sub category
// @route PUT /api/subCategories/:id
// @access Private

export const updateSubCategory = asyncHandler(async (req, res) => {
    try{
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!subCategory){
            res.status(404);
            throw new AppError("Sub Category not found", 404);
        }
        res.status(200).json({ status: true, data: subCategory });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Delete a sub category
// @route DELETE /api/subCategories/:id
// @access Private

export const deleteSubCategory = asyncHandler(async (req, res) => {
    try{
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if(!subCategory){
            res.status(404);
            throw new AppError("Sub Category not found", 404);
        }
        res.status(200).json({ status: true, message: "Sub Category deleted" });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});