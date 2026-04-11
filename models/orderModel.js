import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        productId: {
            type: mongoose.ObjectId,
            ref: "Product"
        },
        name: String,
        price: Number,
        quantity: Number,
        category: String
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["card", "wallet", "upi", "bank"],
        default: "card"
    },
    shippingAddress: {
        name: String,
        phone: String,
        email: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    trackingNumber: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);
