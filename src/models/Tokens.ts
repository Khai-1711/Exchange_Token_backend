import mongoose, { Schema, Document } from 'mongoose';

export interface IToken extends Document {
  token_id: string;
  token_name: string;
  real_time_price: number;
}

const tokenSchema: Schema = new Schema({
  token_id: { type: String, required: true, unique: true },
  token_name: { type: String, required: true },
  real_time_price: { type: Number, required: true },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
