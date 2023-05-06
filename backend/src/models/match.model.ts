import { Schema, model, Types } from 'mongoose';

export interface Match {
    bot1: Types.ObjectId;
    bot2: Types.ObjectId;
    game: Types.ObjectId;
    bot1Winner: boolean;
    bot1Moves: [string];
    bot2Moves: [string];
    gameStates: [string];
}

const matchSchema = new Schema<Match>({
    bot1: Types.ObjectId,
    bot2: Types.ObjectId,
    game: Types.ObjectId,
    bot1Winner: Boolean,
    bot1Moves: [String],
    bot2Moves: [String],
    gameStates: [String],
});

const match = model<Match>('Game', matchSchema);

export default match;
