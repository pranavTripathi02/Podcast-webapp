import { Link } from 'react-router-dom';
import { Podcasts } from '.';
import { CategoryType } from '../Types';

import usePodcasts from '../hooks/usePodcasts';
function Home() {
  const { podcastCategories } = usePodcasts();
  // console.log(podcastCategories);
  return (
    <div className=''>
      <h2 className='text-lg my-2'>Explore Podcasts</h2>
      <div className='snap-mandatory scroll-smooth flex flex-col'>
        {podcastCategories.map((item: CategoryType, index: number) => {
          return (
            <div className='mt-4 snap-start relative' key={index}>
              <h2>
                <Link to={`/categories/${item.genreId}`}>{item.name}</Link>
              </h2>
              <Podcasts podcastCategory={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
