
export default function Podcast({ podcast }: { podcast: any }) {
  const {
    artistName,
    name,
    artworkUrl100,
  }: {
    artistName: string;
    name: string;
    artworkUrl100: string;
  } = podcast;
  // //console.log(artistName, id, name, artworkUrl100, genres, url);
  return (
    <div className='podcast-card w-[100px] overflow-clip h-[170px]'>
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
