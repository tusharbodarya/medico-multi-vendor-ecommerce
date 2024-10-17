import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
},
{
    _id: false, timestamps: true,
}
);

const cancellationSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

},
{
    _id: false,
}
);

const returnSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
},
{
    _id: false,
}
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending",
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "stripe"],
        default: "cash",
    },
    cancellation: cancellationSchema,
    return: returnSchema,
},
{
    timestamps: true,
}
);

export const Order = mongoose.model("Order", orderSchema);