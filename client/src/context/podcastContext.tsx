import { ReactNode, createContext, useEffect, useState } from 'react';
import { PodcastType, CategoryType } from '../Types';
import axios from '../api/axios';

const PodcastContext = createContext<any>(null);

const PodcastProvider = ({ children }: { children: ReactNode }) => {
  const [podcasts, setPodcasts] = useState<Array<PodcastType>>([]);
  const [podcastCategories, setPodcastCategories] = useState<CategoryType[]>(
    []
  );
  const fetchPodcasts = async () => {
    try {
      const { data }: any = await axios('/podcasts');
      // console.log(data.podcasts);
      setPodcasts(data.podcasts);
      // savePodcastCategories({ results: data.podcasts });
    } catch (err) {
      // console.error(err);
    }
    // setPodcasts(data);
  };
  // const cats = [];
  // for (let i = 0; i < results.length; i++) {
  //   for (let j = 0; j < results[i].genres?.length; j++) {
  //     // //console.log(results[i].genres[j].name);
  //     cats.push(results[i].genres[j]);
  //   }
  // }
  // const categories = [...new Set(cats.map((item) => item))];
  const savePodcastCategories = () => {
    const categories: CategoryType[] = [];
    const results = podcasts;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      results[i]?.genres?.filter((item: any) => {
        const j = categories.findIndex(
          (x) =>
            x.name == item.name &&
            x.genreId == item.genreId &&
            x.url == item.url
        );
        if (j <= -1) categories.push(item);
      });
      // for (let j = 0; j < results[i].genres?.length; j++) {
      //   // //console.log(results[i].genres[j].name);
      //   results
      // }
      setPodcastCategories(categories);
    }
  };
  // //console.log(categories);
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
  // //console.log(cats, categories);
  // setPodcastCategories(categories);
  // const
  useEffect(() => {
    fetchPodcasts();
  }, []);
  useEffect(() => {
    savePodcastCategories();
  }, [podcasts]);

  return (
    <PodcastContext.Provider value={{ podcasts, podcastCategories }}>
      {children}
    </PodcastContext.Provider>
  );
};

export { PodcastContext, PodcastProvider };
