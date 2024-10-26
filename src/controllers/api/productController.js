import { Product } from '../../models/productModel.js';
import asyncHandler from "express-async-handler";
import { AppError } from "../../middlewares/errorHandler.js";
// @desc    Create a new product
// @route   POST /api/products
// @access  Private

export const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ status: true, data: newProduct });
    } catch (error) {
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc    Get all products
// @route   GET /api/products
// @access  Public

export const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().populate("vendor");
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc    Get a product by slug
// @route   GET /api/products/:slug
// @access  Public

export const getProductBySlug = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            res.status(404);
            throw new AppError("Product not found", 404);
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private

export const updateProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404);
            throw new AppError("Product not found", 404);
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private

export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404);
            throw new AppError("Product not found", 404);
        }
        res.status(200).json({ status: true, message: "Product deleted successfully." });
    } catch (error) {
        res.status(400);
        throw new AppError(error.message, 400);
    }
});