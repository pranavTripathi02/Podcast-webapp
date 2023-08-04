export type PodcastType = {
  name: string;
  artistName: string;
  id: string;
  artworkUrl100: string;
  genres?: {
    genreId: string;
    name: string;
    url: string;
  }[];
  url: string;
};
export type CategoryType = { name: string; genreId: string; url: string };
