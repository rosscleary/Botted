import { Schema, model } from 'mongoose';

export interface Game {
    name: string,
    controller: string,
    startState: string,
    description: string,
    icon: string
}

const gameSchema = new Schema<Game>({
    name: String,
    controller: String,
    startState: String,
    description: String,
    icon: String
});

const game = model<Game>('Game', gameSchema);

export default game;
