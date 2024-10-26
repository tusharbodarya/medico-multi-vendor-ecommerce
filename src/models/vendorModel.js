import mongoose from "mongoose";
import slugify from "slugify";

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
    slug: {
        type: String,
        unique: true,
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

vendorSchema.pre("save",async function (next) {
    this.slug = slugify(this.storeName, { lower: true });
    next();
});

export const Vendor = mongoose.model("Vendor", vendorSchema);