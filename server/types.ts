import mongoose from 'mongoose';

enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Editor = 'editor',
}

export type PodcastType = {
  podcast_name: string;
  podcast_category: string;
  podcast_speaker?: string;
  podcast_isVideo: boolean;
  podcast_description: string;
  podcast_url: string;
};

export interface UserType extends mongoose.Document {
  user_name: string;
  user_email: string;
  user_password: string;
  user_isAdmin: boolean;
  user_isVerified: boolean;
  passwordCheck(str: string): Promise<boolean>;
  user_roles: Array<UserRoles>;
  user_refreshToken: string;
  // user_name: {
  //   type: string;
  //   required: boolean;
  // };
  // user_email: {
  //   type: string;
  //   unique: boolean;
  //   required: boolean;
  // };
  // user_password: {
  //   type: string;
  //   required: boolean;
  // };
  // user_isAdmin: {
  //   type: boolean;
  //   default: boolean;
  // };
  // user_isVerified: {
  //   type: boolean;
  //   default: boolean;
  // };
}

export type VerificationTokenType = {
  user_id: mongoose.ObjectId;
  token: string;
  createdAt: Date;
};

export type AccessTokenType = {
  user: mongoose.ObjectId;
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
};
