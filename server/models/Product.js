import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, default: 'SHOPWAVE ATELIER' },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    badge: { type: String },
    description: { type: String },
    tags: [{ type: String }],
    sizes: [{ type: String }],
    sizePrices: { type: Map, of: Number },
    colors: [{ type: String }],
    specifications: { type: Map, of: String },
    features: [{ type: String }],
    images: [{ type: String }],
    assured: { type: Boolean, default: true },
    deliveryDays: { type: Number, default: 2 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
