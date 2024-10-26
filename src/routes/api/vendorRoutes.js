import express from 'express';
import { protect } from '../../middlewares/authMiddlewares.js';
import { createVendor, deleteVendor, getVendorBySlug, getVendors, updateVendor } from '../../controllers/api/vendorController.js';

const vendorRouter = express.Router();

// Create a new vendor
vendorRouter.post('/', protect, createVendor);

// Get all vendors
vendorRouter.get('/all', getVendors);

// Get a vendor by slug
vendorRouter.get('/:slug', getVendorBySlug);

// Update a vendor by id
vendorRouter.put('/:id', protect, updateVendor);

// delete a vendor by id
vendorRouter.delete('/:id', protect, deleteVendor);

export default vendorRouter;