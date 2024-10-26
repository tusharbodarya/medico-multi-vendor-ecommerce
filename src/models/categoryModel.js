import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
    }
},
{
    timestamps: true,
}
);

categorySchema.pre("save",async function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export const Category = mongoose.model("Category", categorySchema);