export default function ErrorAlert({ message }: { message: string }) {
  // const [err, setErr] = useState(message);
  // const [showMsg, setShowMsg] = useState(false);
  // const [timeoutId, setTimeoutId] = useState(0);
  console.log('from ErrAlert', message);
  // useEffect(() => {
  //   setShowMsg(true);
  //   clearTimeout(timeoutId);
  //   setTimeoutId(
  //     setTimeout(() => {
  //       setShowMsg(false);
  //     }, 5000)
  //   );
  //   return () => clearTimeout(timeoutId);
  // }, [timeoutId]);
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
    <div className='bg-blue-500 min-w-0 max-w-fit min-h-10 max-h-32 rounded-md shadow-md absolute inset-x-0 bottom-3 m-auto items-center justify-around flex p-2'>
      <p className='text-xl'>{message}</p>
      {/* <p className='text-xl'>Invalid Passowrd</p> */}
      {/* <p className='text-xl'>
        Thanks for registering name. Please check your email inbox to verify
        your account
      </p> */}
    </div>
  );
}
