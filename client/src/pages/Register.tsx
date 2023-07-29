import React, { useMemo, useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!password) {
      setErrMsg('Enter valid password');
      setIsPasswordMatch(false);
      setRePassword('');
      setPassword('');
      debounceError();
      setIsLoading(false);
    } else if (!email) {
      setErrMsg('Enter valid email');
      setIsPasswordMatch(false);
      setRePassword('');
      setPassword('');
      setEmail('');
      debounceError();
      setIsLoading(false);
    } else if (!rePassword || rePassword !== password) {
      setErrMsg('Passwords do not match');
      setIsPasswordMatch(false);
      setRePassword('');
      setPassword('');
      setEmail('');
      debounceError();
      setIsLoading(false);
    } else {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/v1/auth/register',
          JSON.stringify({
            user_name: name,
            user_email: email,
            user_password: password,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log(data);
        setIsPasswordMatch(true);
        setRePassword('');
        setPassword('');
        setEmail('');
        setName('');
        setErrMsg(data.msg);
        debounceError();
      } catch (err) {
        setErrMsg(err.response.data.message);
        debounceError();
      }
    }
    setIsLoading(false);
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
        <h1 className='text-5xl m-7'>Register</h1>
        <div className='bg-slate-700 rounded-lg w-1/2 m-auto text-2xl flex-col justify-evenly py-20 relative border-2 border-yellow-900'>
          <form onSubmit={handleSubmit}>
            <div className='pt-10'>
              {/* <label htmlFor='email'>Email:</label> */}
              <input
                className='rounded-md p-2 w-50 placeholder-shown:border-red-600'
                type='text'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete='off'
                required
              />
            </div>
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
            <div className='pt-10'>
              {/* <label htmlFor='email'>Email:</label> */}
              <input
                className={`${
                  isPasswordMatch ? '' : 'border-red-600 border-2'
                } rounded-md p-2 w-50 placeholder-shown:border-red-600`}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete='off'
                required
              />
            </div>
            <div className='py-10'>
              {/* <label htmlFor='password'>Password:</label> */}
              <input
                className={`${
                  isPasswordMatch ? '' : 'border-red-600 border-2'
                } rounded-md p-2 w-50 placeholder-shown:border-red-600`}
                type='password'
                placeholder='Confirm Password'
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                value={rePassword}
                autoComplete='off'
                required
              />
            </div>
            <button
              className={`bg-sky-600 hover:bg-sky-700 p-4 rounded-2xl ${
                isLoading ? 'bg-sky-900 hover:bg-sky-900' : ''
              }`}
              type='submit'
              disabled={isLoading}
              onSubmit={(e) => handleSubmit(e)}
            >
              {isLoading ? 'Please wait...' : 'Register'}
            </button>
          </form>
          <div className='absolute inset-x-0 bottom-2 max-w-fit mx-auto text-base'>
            <p className='text-gray-400'>
              Have an account already?
              <Link
                className='ps-2 hover:underline text-sky-600 hover:text-sky-400'
                to='/login'
              >
                Login
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
