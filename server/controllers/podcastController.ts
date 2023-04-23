import { PodcastType } from '../types';
import Podcast from '../models/Podcast';
import { StatusCodes } from 'http-status-codes';

const getAllPodcasts = async (_req: any, res: any) => {
  const Podcasts: PodcastType[] = await Podcast.find();
  res.status(StatusCodes.OK).json({ Podcasts });
};

export { getAllPodcasts };
