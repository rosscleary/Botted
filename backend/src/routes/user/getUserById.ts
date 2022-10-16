import { Request, Response } from 'express';
import userModel from '../../models/user.model';

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const id = req.body.id;

  if (typeof id != 'string') {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const user = await userModel.findOne({ _id: id });

  res.status(200).json({ user: user });
};

export default getUserById;
