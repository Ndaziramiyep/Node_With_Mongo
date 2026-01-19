import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: string;
  inStock: boolean;
  quantity: number;
  vendorId: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: true, default: true },
  quantity: { type: Number, required: true, default: 0, min: 0 },
  vendorId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);