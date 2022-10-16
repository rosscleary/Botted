import { Request, Response } from 'express';
import userModel from '../../models/user.model';

const newUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (
    typeof username != 'string' ||
    typeof email != 'string' ||
    typeof password != 'string'
  ) {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const newUser = new userModel({
    username: username,
    email: email,
    bots: [],
    password: password,
  });
  await newUser.save();

  res.status(200).json({ user: newUser });
};

export default newUser;
