import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  addressOfWallet: string;
  username: string;
  passwd: string;
  email: string;
  balance: number;
}

const userSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  passwd : { type: String, required: true},
  email : { type: String},
  addressOfWallet: {type: String},
  balance: { type: Number },
});

const Users = mongoose.model<IUser>('Users', userSchema);

export default Users;
