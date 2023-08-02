import { Link, useParams } from 'react-router-dom';
import usePodcasts from '../hooks/usePodcasts';
import { PodcastType } from '../Types';
import Podcast from '../components/Podcast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

export default function PodcastCategory() {
  const { podcasts } = usePodcasts();
  const { id } = useParams();
  const podcastList = podcasts.filter((item1: any) =>
    item1.genres.some((item2: any) => item2.genreId === id)
  );
  const podcastCat = podcastList[0].genres[0].name;
  return (
    <section>
      <div className='my-5'>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
        <Link className='hover:underline mx-2' to='/categories'>
          Back to Categories
        </Link>
      </div>
      <h2 className='text-xl'>Podcasts in {podcastCat}</h2>
      <div className='mt-2 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-10'>
        {podcastList.map((item: PodcastType, index: number) => {
          return (
            <div key={index}>
              <Podcast podcast={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
