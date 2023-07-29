import axios from 'axios';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ErrorAlert from '../components/ErrorAlert';

export default function Login() {
  const { saveUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  // console.log(from, location);
  // const [email, setEmail] = useState("")
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        JSON.stringify({ user_email: email, user_password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const user = data?.user;
      const accessToken = data?.accessToken;
      // console.log(accessToken);
      setEmail('');
      setPassword('');
      saveUser({ user, accessToken });
      // setErrMsg('Logging In');
      // setMsgType(true);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setErrMsg(err?.response.data.message);
      console.error(err?.response.data.message);
      debounceError();
    }
  };

  const handleError = () => {
    let alertTimeoutId: any;
    return () => {
      setShowMsg(true);
      clearTimeout(alertTimeoutId);
      alertTimeoutId = setTimeout(() => {
        setShowMsg(false);
      }, 5000);
    };
  };

  const debounceError = useMemo(() => handleError(), []);

  return (
    <div className='h-screen'>
      <section className='text-center m-auto pt-40'>
        <h1 className='text-5xl m-7'>Sign In</h1>
        <div className='bg-slate-700 rounded-lg w-1/2 m-auto text-2xl flex-col justify-evenly py-20 relative border-2 border-yellow-900'>
          <form onSubmit={handleSubmit}>
            <div className='pt-10'>
              {/* <label htmlFor='email'>Email:</label> */}
              <input
                className='rounded-md p-2 w-50 placeholder-shown:border-red-600'
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete='off'
                required
              />
            </div>
            <div className='py-10'>
              {/* <label htmlFor='password'>Password:</label> */}
              <input
                className='rounded-md p-2 w-50 placeholder-shown:border-red-600'
                type='password'
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                autoComplete='off'
                required
              />
            </div>
            <button
              className='bg-sky-600 hover:bg-sky-700 p-4 rounded-2xl'
              type='submit'
            >
              Log In
            </button>
          </form>
          <div className='absolute inset-x-0 bottom-2 max-w-fit mx-auto text-base'>
            <p className='text-gray-400'>
              Don't have an account?
              <Link
                className='ps-2 hover:underline text-sky-600 hover:text-sky-400'
                to='/register'
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </section>
      {/* <div className={`${showMsg ? '' : 'hidden'}`}> */}
      {showMsg && <ErrorAlert message={errMsg} />}
      {/* </div> */}
    </div>
  );
}
