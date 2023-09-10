import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  transaction_id: string;
  user_id: string;
  transaction_type: string;
  token_id: string;
  quantity: number;
  price: number;
  timestamp: Date;
}

const transactionSchema: Schema = new Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  transaction_type: { type: String, required: true },
  token_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
