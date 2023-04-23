export type PodcastType = {
  podcast_name: string;
  podcast_category: string;
  podcast_speaker?: string;
  podcast_isVideo: boolean;
  podcast_description: string;
  podcast_url: string;
};

export type UserType = {
  user_name: string;
  user_email: string;
  user_password: string;
  user_isAdmin: boolean;
};
