import { Link } from 'react-router-dom';

export default function Sidebar({
    sidebarStatus,
}: {
    sidebarStatus: boolean;
}) {
    // const [classes, setClasses] = useState('');
    // useEffect(() => {
    //   setClasses(
    //     sidebarStatus
    //       ? 'translate-x-0 duration-200 ease-linear transition fixed border-2 w-40'
    //       : 'translate-x-[-20rem] duration-200 ease-linear transition'
    //   );
    //   //console.log(sidebarStatus);
    // }, [sidebarStatus]);
    return (
        <nav
            className={`
      ${sidebarStatus ? 'translate-x-0' : 'translate-x-[-20rem]'}
    fixed transition ease-linear duration-200 w-44 h-screen bg-[var(--secondary)] text-center capitalize z-50`}
        >
            <div className='flex flex-col h-full'>
                <div className='flex flex-col justify-evenly my-4 h-32'>
                    {/* <div className='hover:bg-stone-700 ease-in-out duration-200 py-2'> */}
                    <Link
                        className='hover:bg-[var(--accent)] ease-in-out duration-200 py-2'
                        to='/'
                    >
                        explore
                    </Link>
                    {/* </div> */}
                    {/* <div className='hover:bg-stone-700 ease-in-out duration-200 py-2'> */}
                    <Link
                        className='hover:bg-[var(--accent)] ease-in-out duration-200 py-2'
                        to='/categories'
                    >
                        categories
                    </Link>
                    {/* </div>
          <div className='hover:bg-stone-700 ease-in-out duration-200 py-2'> */}
                    <Link
                        className='hover:bg-[var(--accent)] ease-in-out duration-200 py-2'
                        to='/subscriptions'
                    >
                        subscriptions
                    </Link>
                    {/* </div> */}
                </div>
                <div className='width-100 border-[var(--accent)] border-t-[1px] mx-2'>

                </div>
                <div className='flex flex-col my-4 justify-evenly h-28'>
                    {/* <div className='hover:bg-stone-700 ease-in-out duration-200 py-2'> */}
                    <Link
                        className='hover:bg-[var(--accent)] ease-in-out duration-200 py-2'
                        to='/settings'
                    >
                        settings
                    </Link>
                    {/* </div> */}
                    {/* <div className='hover:bg-stone-700 ease-in-out duration-200 py-2'> */}
                    <Link
                        className='hover:bg-[var(--accent)] ease-in-out duration-200 py-2'
                        to='/help'
                    >
                        help
                    </Link>
                    {/* </div> */}
                </div>
            </div>
        </nav>
    );
}
