import usePodcasts from '../hooks/usePodcasts';
import Podcast from '../components/Podcast';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function Podcasts({
  podcastCategory,
}: {
  podcastCategory: string;
}) {
  const { podcasts } = usePodcasts();
  const podcastBanner = useRef(null);
  // const podcastList = [];
  // const [podcastList, setPodcastList] = useState([]);
  // const podcastList = podcasts;
  const podcastList = podcasts.filter(
    (item1: any) =>
      // console.log(Object.entries(item1.genres));
      // Object.fromEntries()
      // if (
      // item1.genres.filter((item2) => {
      //   if (item2.name === podcastCategory) {
      // console.log(item2.name, podcastCategory);
      // return true;
      //   }
      // })
      item1.genres.some((item2: any) => item2.name === podcastCategory)
    // )
    //   // console.log('hi');
    //   return item1;
  );
  const handleBtnClick = (dir: string) => {
    // console.log('here');
    const step = dir === 'left' ? -30 : 30;
    let scrollAmount = 0;
    // const mainDiv = document.getElementById('podcast-bar');
    // console.log(podcastBanner);
    // podcastBanner.current.scrollLeft += scrollAmount;
    // podcastBanner.current.scrollLeft
    // mainDiv.scrollLeft += 10;
    const sliderTimer = setInterval(() => {
      podcastBanner.current.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= 150) clearInterval(sliderTimer);
    }, 15);
  };
  // for (let i = 0; i < podcasts.length; i++) {
  //   podcasts[i].genres.forEach((item) => {
  //     if (item.name === podcastCategory) podcastList.push(podcasts[i]);
  //   });
  // podcastList.push(podcasts[i].genre.filter((item: any) =>)
  // }
  // item.genres.includes( name: { podcastCategory } )
  // console.log(podcastList);
  return (
    <div className='my-2 flex items-center relative'>
      <button
        onClick={() => {
          handleBtnClick('left');
        }}
      >
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          className='text-3xl text-slate-500 absolute top-10 left-[-20px]'
        />
      </button>
      <div
        ref={podcastBanner}
        className='flex overflow-x-scroll overflow-y-hidden justify-start podcast-bar'
      >
        {podcastList.map((item: any, index: number) => {
          return (
            <div className='mx-2' key={index}>
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
          className='text-3xl text-slate-500 absolute top-10 right-[-20px]'
          // onClick={() => {
          //   handleBtnClick(e.current, 'right');
          // }}
        />
      </button>
    </div>
  );
}
