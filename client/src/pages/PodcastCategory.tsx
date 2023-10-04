import { useParams, useNavigate } from 'react-router-dom';
import usePodcasts from '../hooks/usePodcasts';
import { PodcastType } from '../Types';
import Podcast from '../components/Podcast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import LoadingPods from '../components/LoadingPods';

export default function PodcastCategory() {
    const { podcasts, isLoading } = usePodcasts();
    const { id } = useParams();
    const podcastList = podcasts.filter((item1: any) =>
        item1.genres.some((item2: any) => item2.genreId === id)
    );
    const podcastCat = podcastList[0].genres[0].name;
    const navigate = useNavigate();
    return isLoading ? (
        <LoadingPods />
    ) : (
        <section>
            <div className='my-5 hover:text-[var(--accent)]' onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
                <button className='mx-2'>
                    Go back
                </button>
            </div>
            <h2>Podcasts in {podcastCat}</h2>
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
