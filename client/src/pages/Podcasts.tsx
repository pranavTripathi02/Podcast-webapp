import usePodcasts from '../hooks/usePodcasts';
import Podcast from '../components/Podcast';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowCircleLeft,
    faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

export default function Podcasts({
    podcastCategory,
}: {
    podcastCategory: string;
}) {
    const { podcasts } = usePodcasts();
    // console.log(podcasts);
    const podcastBanner = useRef<null | HTMLHeadingElement>(null);
    // //console.log('hi', podcastCategory);
    // const podcastList = [];
    // const [podcastList, setPodcastList] = useState([]);
    // const podcastList = podcasts;
    const podcastList = podcasts.filter(
        (item1: any) =>
            // //console.log(Object.entries(item1.genres));
            // Object.fromEntries()
            // if (
            // item1.genres.filter((item2) => {
            //   if (item2.name === podcastCategory) {
            // //console.log(item2.name, podcastCategory);
            // return true;
            //   }
            // })
            item1.genres.some((item2: any) => item2.name === podcastCategory)
        // )
        //   // //console.log('hi');
        //   return item1;
    );
    const handleBtnClick = (dir: string) => {
        // //console.log('here');
        const step = dir === 'left' ? -30 : 30;
        let scrollAmount = 0;
        // const mainDiv = document.getElementById('podcast-bar');
        // //console.log(podcastBanner);
        // podcastBanner.current.scrollLeft += scrollAmount;
        // podcastBanner.current.scrollLeft
        // mainDiv.scrollLeft += 10;
        const sliderTimer = setInterval(() => {
            if (podcastBanner.current) podcastBanner.current.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= 350) clearInterval(sliderTimer);
        }, 15);
    };
    // for (let i = 0; i < podcasts.length; i++) {
    //   podcasts[i].genres.forEach((item) => {
    //     if (item.name === podcastCategory) podcastList.push(podcasts[i]);
    //   });
    // podcastList.push(podcasts[i].genre.filter((item: any) =>)
    // }
    // item.genres.includes( name: { podcastCategory } )
    // //console.log(podcastList);
    // const getInfo = async () => {
    //   const url = podcastList[0].id;
    //   console.log(url);
    //   try {
    //     const podInfo = await axios(`https://itunes.apple.com/lookup?id=${url}`);
    //     console.log(podInfo.data);
    //     const feedUrl = podInfo.data.feedUrl;
    //     console.log(feedUrl);
    //     const { data } = await axios(feedUrl);
    //     console.log(data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // useEffect(() => {
    //   getInfo();
    // }, []);
    // console.log(podcastList[0])
    return (
        <div className='flex items-center mt-2 relative'>
            <button
                onClick={() => {
                    handleBtnClick('left');
                }}
            >
                <FontAwesomeIcon
                    icon={faArrowCircleLeft}
                    className='text-3xl text-[var(--accent)] absolute top-10 
                    left-[-20px]' />
            </button>
            <div
                ref={podcastBanner}
                className='flex overflow-x-scroll overflow-y-hidden 
                justify-start podcast-bar'
            >
                {podcastList.map((item: any, index: number) => {
                    return (
                        <div
                            className='mx-2 cursor-pointer'
                            key={index}
                        >
                            <Podcast podcast={item} />
                        </div>
                    );
                })}
            </div>
            <button
                onClick={() => {
                    handleBtnClick('right');
                }}
            >
                <FontAwesomeIcon
                    icon={faArrowCircleRight}
                    className='text-3xl text-[var(--accent)] absolute top-10 
                    right-[-20px]'
                // onClick={() => {
                //   handleBtnClick(e.current, 'right');
                // }}
                />
            </button>
        </div>
    );
}
