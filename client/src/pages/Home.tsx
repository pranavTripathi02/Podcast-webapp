import { Link } from 'react-router-dom';
import { Podcasts } from '.';
import { CategoryType } from '../Types';

import usePodcasts from '../hooks/usePodcasts';
import LoadingPods from '../components/LoadingPods';
function Home() {
    const { podcastCategories, isLoading, isModalOpen } = usePodcasts();
    return (
        <div className=''>
            <h2 className='my-2'>Explore Podcasts</h2>
            {isLoading && !isModalOpen ? (
                <LoadingPods />
            ) : (
                <div className='snap-mandatory scroll-smooth flex flex-col'>
                    {podcastCategories.map((item: CategoryType, index: number) => {
                        return (
                            <div className='mt-4 snap-start relative' key={index}>
                                <h3>
                                    <Link to={`/categories/${item.genreId}`}
                                        className='hover:text-[var(--primary)]'>
                                        {item.name}
                                    </Link>
                                </h3>
                                <Podcasts podcastCategory={item.name} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Home;
