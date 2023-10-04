// import React, { useState } from 'react';
import { CategoryType } from '../Types';
import usePodcasts from '../hooks/usePodcasts';
import { Link } from 'react-router-dom';

export default function Categories() {
    // const [podcastList, setPodcastList] = useState<Array<PodcastType>>([]);
    const { podcastCategories } = usePodcasts();
    // //console.log(podcastCategories);
    // const podcastCategory =
    // if (podcastCategory) {
    //   const tempPodcastList = podcasts.filter(
    //     (item1: any) =>
    //       // //console.log(Object.entries(item1.genres));
    //       // Object.fromEntries()
    //       // if (
    //       // item1.genres.filter((item2) => {
    //       //   if (item2.name === podcastCategory) {
    //       // //console.log(item2.name, podcastCategory);
    //       // return true;
    //       //   }
    //       // })
    //       item1.genres.some((item2: any) => item2.name === podcastCategory)
    //     // )
    //     //   // //console.log('hi');
    //     //   return item1;
    //   );
    //   setPodcastList(tempPodcastList);
    // }
    // return id ? (
    //   <Podcasts podcastCategory={podcastCategory} />
    // ) : (
    return (
        <>
            <h2 className='my-2'>Podcast Categories</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10'>
                {podcastCategories.map((item: CategoryType, index: number) => {
                    return (
                        <Link
                            className='text-center mx-5 my-auto 
                            hover:text-[var(--accent)]'
                            key={index}
                            to={`./${item.genreId}`} >
                            <h5>
                                {item.name}
                            </h5>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
