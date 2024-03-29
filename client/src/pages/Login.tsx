import axios from '../api/axios';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ErrorAlert from '../components/ErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // //console.log(from, location);
    // const [email, setEmail] = useState("")
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                '/auth/login',
                JSON.stringify({ user_email: email, user_password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            const user = data?.user;
            const accessToken = data?.accessToken;
            // //console.log(accessToken);
            setEmail('');
            setPassword('');
            setAuth({ user, accessToken });
            // setErrMsg('Logging In');
            // setMsgType(true);
            navigate(from, { replace: true });
        } catch (err: unknown) {
            handleErrorMsg(err);
            debounceError();
        }
        setIsLoading(false);
    };
    const handleErrorMsg = (err: any) => {
        // console.error(err);
        setErrMsg(err?.response.data.message);
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
                <h1 className='text-4xl m-7'>Sign In</h1>
                <div className='bg-[var(--secondary)] rounded-lg w-[36rem] m-auto text-base flex-col justify-evenly py-10 relative border-2 border-[var(--accent)]'>
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
                            className={`bg-[var(--primary)] hover:bg-[var(--accent)] p-4 rounded-2xl ${isLoading ? 'bg-[var(--accent)]' : ''
                                }`}
                            type='submit'
                            disabled={isLoading}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                className={`${isLoading ? 'px-2 animate-spin' : 'hidden'}`}
                            />
                            {isLoading ? 'Please wait...' : 'Log In'}
                        </button>
                    </form>
                    <div className='absolute inset-x-0 bottom-2 max-w-fit mx-auto text-sm'>
                        <p className='text-gray-400'>
                            Don't have an account?
                            <Link
                                className='ps-2 hover:underline text-[var(--primary)] hover:text-[var(--accent)]'
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
