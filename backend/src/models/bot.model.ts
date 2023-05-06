import { Schema, model, Types } from 'mongoose';

export interface Bot {
  versions: [Types.ObjectId];
  user: Types.ObjectId;
  game: Types.ObjectId;
  rank: number;
  winPercentage: number;
}

const botSchema = new Schema<Bot>({
  versions: [Types.ObjectId],
  user: Types.ObjectId,
  game: Types.ObjectId,
  rank: Number,
  winPercentage: Number,
});

const bot = model<Bot>('Bot', botSchema);

export default bot;
