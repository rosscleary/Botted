import { Schema, model, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  bots: [Types.ObjectId];
  password: string;
}

const userSchema = new Schema<User>({
  username: String,
  email: String,
  bots: [Types.ObjectId],
  password: String,
});

const user = model<User>('User', userSchema);

export default user;
