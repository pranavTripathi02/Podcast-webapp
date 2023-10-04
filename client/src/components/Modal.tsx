// @format
// import React from 'react';
import { useAuth } from '../hooks';
import usePodcasts from '../hooks/usePodcasts';
import LoadingPods from './LoadingPods';

export default function Modal() {
    const { podInfo, isLoading, isModalOpen, setIsModalOpen } = usePodcasts();
    const { auth } = useAuth();
    const handleSubscribe = () => {
        console.log('subscribe');
        setIsModalOpen(false);
    };



    return (
        <>
            {/* <button
        className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={() => setIsModalOpen(true)}
      >
        Open regular modal
      </button> */}
            {isModalOpen ? (
                <>
                    <div
                        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none'
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                            {/*content*/}
                            {isLoading ? (
                                <div className='border-0 rounded-lg shadow-lg relative w-auto bg-transparent outline-none focus:outline-none p-40'>
                                    <LoadingPods />
                                </div>
                            ) : (
                                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[var(--secondary)] outline-none focus:outline-none'>
                                    {/*header*/}
                                    <div className='flex items-center justify-start p-5 border-b border-solid border-[var(--accent)] rounded-t'>
                                        <div className='w-[100px] h-[100px]'>
                                            <img
                                                className='m-auto rounded-xl'
                                                src={podInfo.image?.url}
                                                alt='podcast-image'
                                            />
                                        </div>
                                        <h3 className='text-3xl font-semibold mx-5'>
                                            {podInfo.title}
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className='relative p-6 flex-auto'>
                                        <div
                                            className='my-4 text-lg leading-relaxed'
                                            dangerouslySetInnerHTML={{ __html: podInfo.description }}
                                        >
                                            {/* {podInfo.description} */}
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className='flex items-center justify-end p-6 border-t border-solid border-[var(--accent)] rounded-b'>
                                        <button
                                            className='background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                            type='button'
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Close
                                        </button>
                                        {auth?.user ? (
                                            <button
                                                className='bg-[var(--accent)] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                type='button'
                                                onClick={() => handleSubscribe()}
                                            >
                                                Subscribe
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='opacity-50 fixed inset-0 z-20 bg-black'></div>
                </>
            ) : null}
        </>
    );
}
