import axios from '../api/axios';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios('/refresh', { withCredentials: true });
    // //console.log(response);
    setAuth((prev: any) => {
      //console.log(JSON.stringify(prev));
      //console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
}
