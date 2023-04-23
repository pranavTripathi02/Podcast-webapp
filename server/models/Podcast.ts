import { Schema, model } from 'mongoose';
import { PodcastType } from '../types';

const PodcastSchema = new Schema<PodcastType>(
  {
    podcast_name: {
      type: String,
      required: true,
    },
    podcast_category: {
      type: String,
      required: true,
    },
    podcast_isVideo: {
      type: Boolean,
      required: true,
    },
    podcast_description: {
      type: String,
      minLength: 15,
    },
    podcast_speaker: String,
    podcast_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Podcast = model<PodcastType>('Podcast', PodcastSchema);
export default Podcast;
