import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';

mongoose
  .connect(
    'mongodb+srv://botted:Zmbuu3dvJfNCu3nO@cluster0.dsnzu.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB database');
    const app: Application = express();
    const port: number = 3001;

    app.use(cors());
    app.use(express.json());

    app.use('/api', routes);

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World');
    });

    app.listen(port, () => {
      console.log('Connected successfully on port ' + port);
    });
  })
  .catch((e) => {
    console.log(`Failed to connect to MongoDB database: ${e}`);
  });
