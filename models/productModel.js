import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase:true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String, // main image
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    required: true
  },
  specifications: [specificationSchema]
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);

