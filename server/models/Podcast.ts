import { Schema, model } from 'mongoose';
import { PodcastType } from '../types';

const PodcastSchema = new Schema<PodcastType>(
  {
    artistName: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    artworkUrl100: String,
    url: String,
    genres: [
      {
        genreId: String,
        name: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const Podcast = model<PodcastType>('Podcasts', PodcastSchema);
export default Podcast;
