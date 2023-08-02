import { ReactNode, createContext, useEffect, useState } from 'react';
import PodcastJSON from '../assets/podcasts.json';
import { PodcastType, CategoryType } from '../Types';

const PodcastContext = createContext<any>(null);

const PodcastProvider = ({ children }: { children: ReactNode }) => {
  const [podcasts, setPodcasts] = useState<Array<PodcastType>>([]);
  const [podcastCategories, setPodcastCategories] = useState<
    Array<CategoryType>
  >([]);
  const saveAllPodcasts = () => {
    const { results } = PodcastJSON.feed;
    setPodcasts(results);
    // const cats = [];
    // for (let i = 0; i < results.length; i++) {
    //   for (let j = 0; j < results[i].genres?.length; j++) {
    //     // console.log(results[i].genres[j].name);
    //     cats.push(results[i].genres[j]);
    //   }
    // }
    // const categories = [...new Set(cats.map((item) => item))];
    const categories: CategoryType[] = [];
    for (let i = 0; i < results.length; i++) {
      results[i].genres.filter((item) => {
        const j = categories.findIndex(
          (x) =>
            x.name == item.name &&
            x.genreId == item.genreId &&
            x.url == item.url
        );
        if (j <= -1) categories.push(item);
      });
      // for (let j = 0; j < results[i].genres?.length; j++) {
      //   // console.log(results[i].genres[j].name);
      //   results
      // }
    }
    setPodcastCategories(categories);
    // console.log(categories);
    // results.filter((item)=>{
    //   const i = categories.findIndex((x)=>x.name == item.name && x.genreId==item.genres.gen)
    // })
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
    // setPodcastCategories(categories);
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
