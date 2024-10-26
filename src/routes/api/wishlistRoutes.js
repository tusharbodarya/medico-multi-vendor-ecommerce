import express from 'express';
import { protect } from '../../middlewares/authMiddlewares.js';
import { createWishlist, deleteWishlist, getWishlistById, getWishlists, updateWishlist } from '../../controllers/api/wishlistController.js';


const wishlistRouter = express.Router();

// Create a new wishlist
wishlistRouter.post('/', protect, createWishlist);

// Get all wishlists
wishlistRouter.get('/all', getWishlists);

// Get a wishlist by id
wishlistRouter.get('/:id', getWishlistById);

// Update a wishlist by id
wishlistRouter.put('/:id', protect, updateWishlist);

// delete a wishlist by id
wishlistRouter.delete('/:id', protect, deleteWishlist);


export default wishlistRouter;