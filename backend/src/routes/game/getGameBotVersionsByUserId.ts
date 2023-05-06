import { Request, Response } from 'express';
import versionModel, { Version } from '../../models/version.model';
import botModel from '../../models/bot.model';

const getGameBotVersionsByUserId = async (req: Request, res: Response): Promise<void> => {
    const { gameId, userId } = req.body;

    if (typeof gameId != 'string' || typeof userId != 'string') {
        res.status(400).json({ error: 'Validation failed, variable types are incorrect.' });
        return;
    }

    const bot = await botModel.findOne({ game: gameId, user: userId });
    if (!bot) {
        res.status(400).json({ error: 'No bot with given user id and game' });
        return;
    }

    let botVersions: Version[] = [];
    for (const versionId of bot.versions) {
        const version = await versionModel.findOne({ _id: versionId });
        botVersions.push(version as Version);
    }

    res.status(200).json({ versions: botVersions });
};

export default getGameBotVersionsByUserId;
