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
            className='bg-[var(--primary)] hover:bg-[var(--accent)] rounded-md px-2 py-1'
            onClick={signout}
        >
            Sign Out
        </button>
    ) : (
        <Link
            className='bg-[var(--primary)] hover:bg-[var(--accent)] rounded-md px-2 py-1'
            to='/login'
        >
            Sign In
        </Link>
    );
}
