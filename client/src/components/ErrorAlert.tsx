// import { useEffect, useState } from 'react';

export default function ErrorAlert({ message }: { message: string }) {
  // const [showMsg, setShowMsg] = useState(false);
  // const [timeoutId, setTimeoutId] = useState(0);
  //console.log('from ErrAlert', message);

  // useEffect(() => {
  // setTimeoutId(
  //   setTimeout(() => {
  //     setShowMsg(false);
  //   }, 5000)
  // );
  // // }, []);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [timeoutId]);

  return (
    <div className='bg-sky-600 min-w-0 max-w-fit min-h-10 max-h-32 rounded-md shadow-md absolute inset-x-0 bottom-3 m-auto items-center justify-around flex p-2'>
      <p className='text-base'>{message}</p>
      {/* <p className='text-xl'>Invalid Passowrd</p> */}
      {/* <p className='text-base'>
        Thanks for registering name. Please check your email inbox to verify
        your account
      </p> */}
    </div>
  );
}
