import { ReactNode, createContext, useEffect, useState } from 'react';
import PodcastJSON from '../assets/podcasts.json';

type PodcastType = {
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

const PodcastContext = createContext<any>(null);

const PodcastProvider = ({ children }: { children: ReactNode }) => {
  const [podcasts, setPodcasts] = useState<Array<PodcastType>>([]);
  const [podcastCategories, setPodcastCategories] = useState<Array<string>>([]);
  const saveAllPodcasts = () => {
    const { results } = PodcastJSON.feed;
    setPodcasts(results);
    const cats = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].genres?.length; j++) {
        // console.log(results[i].genres[j].name);
        cats.push(results[i].genres[j].name);
      }
    }
    const categories = [...new Set(cats.map((item) => item))];
    // results.map((item) => {
    //   (item.genres?.map((cat) => cat.name)); }),
    // const cats = [
    //   ...new Set(
    //     results
    //       .map((item) => item.genres?.map((cat) => cat.name))
    //       .map((item) => item)
    //   ),
    // ];
    // console.log(cats, categories);
    setPodcastCategories(categories);
  };
  // const
  useEffect(() => {
    saveAllPodcasts();
  }, []);

  return (
    <PodcastContext.Provider value={{ podcasts, podcastCategories }}>
      {children}
    </PodcastContext.Provider>
  );
};

export { PodcastContext, PodcastProvider };
