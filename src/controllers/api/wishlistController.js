import asyncHandler from "express-async-handler";
import { AppError } from "../../middlewares/errorHandler.js";
import { Wishlist } from "../../models/wishlistModel.js";


// @desc  Create a new wishlist
// @route POST /api/wishlists
// @access Private

export const createWishlist = asyncHandler(async (req, res) => {
    try{
        const newWishlist = await Wishlist.create(req.body);
        res.status(201).json({ status: true, data: newWishlist});
    }catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get all wishlists
// @route GET /api/wishlists
// @access Public

export const getWishlists = asyncHandler(async (req, res) => {
    try{
        const wishlists = await Wishlist.find().populate("user");
        res.status(200).json({ status: true, data: wishlists });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get a wishlist by id
// @route GET /api/wishlists/:id
// @access Public

export const getWishlistById = asyncHandler(async (req, res) => {

    try{
        const wishlist = await Wishlist.findById(req.params.id).populate("user");
        if(!wishlist){
            res.status(404);
            throw new AppError("Wishlist not found", 404);
        }
        res.status(200).json({ status: true, data: wishlist });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Update a wishlist
// @route PUT /api/wishlists/:id
// @access Private

export const updateWishlist = asyncHandler(async (req, res) => {
    try{
        const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!wishlist){
            res.status(404);
            throw new AppError("Wishlist not found", 404);
        }
        res.status(200).json({ status: true, data: wishlist });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});



// @desc  Delete a wishlist
// @route DELETE /api/wishlists/:id
// @access Private


export const deleteWishlist = asyncHandler(async (req, res) => {
    try{
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        if(!wishlist){
            res.status(404);
            throw new AppError("Wishlist not found", 404);
        }
        res.status(200).json({ status: true, data: wishlist });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});


// @desc  Get a wishlist by user id
// @route GET /api/wishlists/user/:id
// @access Public

export const getWishlistByUser = asyncHandler(async (req, res) => {
    try{
        const wishlist = await Wishlist.find({ user: req.params.id }).populate("user");
        if(!wishlist){
            res.status(404);
            throw new AppError("Wishlist not found", 404);
        }
        res.status(200).json({ status: true, data: wishlist });
    } catch(error){
        res.status(400);
        throw new AppError(error.message, 400);
    }
});