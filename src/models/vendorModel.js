import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeDescription: {
        type: String,
        required: true,
    },
    storeImage: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
},
{
    timestamps: true,
}
);

const Vendor = mongoose.model("Vendor", vendorSchema);