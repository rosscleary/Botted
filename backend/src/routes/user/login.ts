import { Request, Response } from 'express';
import userModel from '../../models/user.model';

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });
  if (!user || user.password != password) {
    res.status(400).json({ message: 'Invalid username or password' });
    return;
  }

  res.status(200).json({ token: user._id });
};

export default login;
