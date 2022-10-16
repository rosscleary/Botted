import { Schema, model, Types } from 'mongoose';
import { Version } from './version.model';
import { User } from './user.model';

export interface Bot {
  name: string;
  versions: [Types.ObjectId];
  user: Types.ObjectId;
  game: String;
  rank: number;
  winPercentage: number;
}

const botSchema = new Schema<Bot>({
  name: String,
  versions: [Types.ObjectId],
  user: Types.ObjectId,
  game: String,
  rank: Number,
  winPercentage: Number,
});

const bot = model<Bot>('Bot', botSchema);

export default bot;
