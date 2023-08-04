import { PodcastType } from '../types';
import Podcasts from '../models/Podcast';
import { StatusCodes } from 'http-status-codes';

const getAllPodcasts = async (_req: any, res: any) => {
  const podcasts: PodcastType[] = await Podcasts.find();
  // console.log(podcasts, 'here');
  res.status(StatusCodes.OK).json({ podcasts });
};

export { getAllPodcasts };
