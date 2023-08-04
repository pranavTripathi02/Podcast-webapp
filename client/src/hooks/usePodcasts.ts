import { useContext } from 'react';
import { PodcastContext } from '../context/podcastContext';

const usePodcasts = () => {
  return useContext(PodcastContext);
};

export default usePodcasts;
