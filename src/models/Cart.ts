import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  _id?: string;
  product: string;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema: Schema = new Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const CartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [CartItemSchema]
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', CartSchema, 'carts');