import usePodcasts from "../hooks/usePodcasts";

export default function Podcast({ podcast }: { podcast: any }) {
    const {
        artistName,
        name,
        artworkUrl100,
        id
    }: {
        artistName: string;
        name: string;
        artworkUrl100: string;
        id: string;
    } = podcast;
    const { setPodId, setIsModalOpen } = usePodcasts();
    // console.log(artistName, id, name, artworkUrl100);
    return (
        <div className='podcast-card w-[100px] 
            hover:text-[var(--accent)]
            overflow-hidden h-[170px] cursor-pointer'
            onClick={() => { setPodId(id); setIsModalOpen(true) }}>
            <div className="overflow-hidden">
                <img
                    className='rounded-xl 
                hover:scale-110 duration-1000'
                    src={artworkUrl100}
                    alt='podcast-image'
                />
            </div>
            <div className="">
                <h3 className='text-sm'>{name}</h3>
                <h4 className='text-xs'>{artistName}</h4>
            </div>
        </div>
    );
}
