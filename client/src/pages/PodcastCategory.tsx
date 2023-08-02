import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePodcasts from '../hooks/usePodcasts';
import { CategoryType } from '../Types';
import { Podcasts } from '.';
import Podcast from '../components/Podcast';

export default function PodcastCategory() {
  const { podcasts } = usePodcasts();
  const { id } = useParams();
  const podcastList = podcasts.filter((item1: any) =>
    item1.genres.some((item2: any) => item2.genreId === id)
  );
  return (
    <div className='mt-10 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-10'>
      {podcastList.map((item, index) => {
        return (
          <div key={index}>
            <Podcast podcast={item} />
          </div>
        );
      })}
    </div>
  );
}
