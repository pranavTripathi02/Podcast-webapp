import { Podcasts } from '.';
import PodcastList from '../assets/podcasts.json';
import Podcast from '../components/Podcast';
import usePodcasts from '../hooks/usePodcasts';
function Home() {
  const { podcastCategories } = usePodcasts();
  // console.log(podcastCategories);
  return (
    <div className=''>
      <h2 className='text-lg my-2'>Explore Podcasts</h2>
      <div className='snap-mandatory scroll-smooth flex flex-col'>
        {podcastCategories.map((item: string, index: number) => {
          return (
            <div className='mt-4 snap-start' key={index}>
              <h2>{item}</h2>
              <Podcasts podcastCategory={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
