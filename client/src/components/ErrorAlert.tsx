import { useEffect, useState } from 'react';

export default function ErrorAlert({ message }: { message: string }) {
  // const [err, setErr] = useState(message);
  // console.log('from ErrAlert', err, message);
  // useEffect(() => {
  //   setErr(message);
  //   const timeout = setTimeout(() => {
  //     setErr('');
  //     console.log('from ErrAlert 2', err, message);
  //   }, 5000);
  //   return () => clearTimeout(timeout);
  // }, [message]);
  // if (err.length > 1) return;
  return (
    <div className='bg-blue-500 w-96 h-10 rounded-md shadow-md absolute inset-x-0 bottom-3 m-auto flex items-center justify-around'>
      <p className='text-xl'>{message}</p>
    </div>
  );
}
