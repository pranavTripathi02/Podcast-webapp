import axios from '../api/axios';
import { useAuth } from '.';

export default function useLogout() {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      const response = await axios('/auth/logout', { withCredentials: true });
      //console.log(response);
      setAuth({});
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
}
