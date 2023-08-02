import React from 'react';

export default function Podcast({ podcast }: { podcast: any }) {
  const {
    artistName,
    id,
    name,
    artworkUrl100,
    genres,
    url,
  }: {
    artistName: string;
    id: string;
    name: string;
    artworkUrl100: string;
    genres: Array<{ genreId: string; name: string }>;
    url: string;
  } = podcast;
  // console.log(artistName, id, name, artworkUrl100, genres, url);
  return (
    <div className='podcast-card overflow-clip hover:overflow-visible w-[100px] h-[150px]'>
      <img
        className='m-auto rounded-xl'
        src={artworkUrl100}
        alt='podcast-image'
      />
      <h3 className='text-sm'>{name}</h3>
      <h4 className='text-xs'>{artistName}</h4>
    </div>
  );
}
