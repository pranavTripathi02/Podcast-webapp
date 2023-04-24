import mongoose from 'mongoose';

export type PodcastType = {
  podcast_name: string;
  podcast_category: string;
  podcast_speaker?: string;
  podcast_isVideo: boolean;
  podcast_description: string;
  podcast_url: string;
};

export interface UserType extends mongoose.Document {
  user_name: {
    type: string;
    required: boolean;
  };
  user_email: {
    type: string;
    unique: boolean;
    required: boolean;
  };
  user_password: {
    type: string;
    // minLength: number;
    required: boolean;
  };
  user_isAdmin: {
    type: boolean;
    default: boolean;
  };
  user_isVerified: {
    type: boolean;
    default: boolean;
  };
}

export type VerificationTokenType = {
  user_id: mongoose.ObjectId;
  token: string;
};

export type AccessTokenType = {
  user: mongoose.ObjectId;
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
};
