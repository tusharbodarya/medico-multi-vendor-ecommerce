import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
}
);

subCategorySchema.pre("save",async function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});


export const SubCategory = mongoose.model("SubCategory", subCategorySchema);