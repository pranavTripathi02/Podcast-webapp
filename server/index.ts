require('dotenv').config();
import express from 'express';
const app = express();
app.use(express.json());

import podcastsRouter from './routes/podcastsRouter';
app.use('/api/v1/podcasts', podcastsRouter);

const DB_URL = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 8080;
import connectDB from './connectDB';

const startApp = (): void => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}...`);
    });
    connectDB(DB_URL);
  } catch (err) {
    console.error('Something went wrong while starting the app\n', err);
  }
};
startApp();
