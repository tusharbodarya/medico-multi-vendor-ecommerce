import asyncHandler from "express-async-handler";
import { Vendor } from "../../models/vendorModel.js";
import { AppError } from "../../middlewares/errorHandler.js";

// @desc  Create a new vendor
// @route POST /api/vendors
// @access Private

export const createVendor = asyncHandler(async (req, res) => {
    try{
        const newVendor = await Vendor.create(req.body);
        res.status(201).json({ status: true, data: newVendor});
    }catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Get all vendors
// @route GET /api/vendors
// @access Public

export const getVendors = asyncHandler(async (req, res) => {
    try{
        const vendors = await Vendor.find().populate("user");
        res.status(200).json({ status: true, data: vendors });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Get a vendor by slug
// @route GET /api/vendors/:slug
// @access Public

export const getVendorBySlug = asyncHandler(async (req, res) => {
    try{
        const vendor = await Vendor.findOne({ slug: req.params.slug }).populate("user", "-password");
        res.status(200).json({ status: true, data: vendor });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Update a vendor
// @route PUT /api/vendors/:id
// @access Private

export const updateVendor = asyncHandler(async (req, res) => {
    try{
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!vendor){
            res.status(404);
            throw new AppError("Vendor not found", 404);
        }
        res.status(200).json({ status: true, data: vendor });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});

// @desc  Delete a vendor
// @route DELETE /api/vendors/:id
// @access Private

export const deleteVendor = asyncHandler(async (req, res) => {
    try{
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if(!vendor){
            res.status(404);
            throw new AppError("Vendor not found", 404);
        }
        res.status(204).json({ status: true, message: "Vendor deleted successfully" });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});