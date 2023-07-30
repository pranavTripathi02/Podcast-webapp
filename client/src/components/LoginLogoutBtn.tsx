import { useAuth, useLogout } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginLogoutBtn() {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const signout = async () => {
    await logout();
    navigate('/');
  };
  return auth?.user ? (
    <button
      className='bg-sky-600 hover:bg-sky-700 rounded-md px-2 py-1'
      onClick={signout}
    >
      Sign Out
    </button>
  ) : (
    <Link
      className='bg-sky-600 hover:bg-sky-700 rounded-md px-2 py-1'
      to='/login'
    >
      Sign In
    </Link>
  );
}
