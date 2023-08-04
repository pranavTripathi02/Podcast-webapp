require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express')
const app = express();
app.use(express.json());

import corsOptions from './config/corsOptions';
app.use(cors(corsOptions));
// app.use(Error)

import cookieParser from 'cookie-parser';
app.use(cookieParser(process.env.JWT_SECRET));

import podcastsRouter from './routes/podcastsRouter';
app.use('/api/v1/podcasts', podcastsRouter);
import authRouter from './routes/authRoutes';
app.use('/api/v1/auth', authRouter);
import refreshTokenRouter from './routes/refreshRoutes';
app.use('/api/v1/refresh', refreshTokenRouter);
import userRouter from './routes/userRoutes';
import { verifyJWT } from './middleware/VerifyJWT';
app.use(verifyJWT);
app.use('/api/v1/users', userRouter);
import ErrorHandlerMiddleware from './middleware/Error';
app.use(ErrorHandlerMiddleware);

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
