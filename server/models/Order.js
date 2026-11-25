import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String, required: true },
    size: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, default: 1 },
    image: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    status: { type: String, default: 'confirmed' },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
    },
    items: [orderItemSchema],
    pricing: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    paymentMethod: { type: String, default: 'upi' },
    payment: {
      transactionId: { type: String },
      method: { type: String },
      status: { type: String },
      paidAt: { type: Date },
      upiId: { type: String },
      bankName: { type: String },
      cardLast4: { type: String },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
