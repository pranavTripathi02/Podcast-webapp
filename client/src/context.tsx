import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

type UserType = {
  email?: string;
  name?: string;
};

type Props = {
  children?: React.ReactNode;
};

const AppContext = createContext<any>(null);

const AppProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const saveUser = (currUser: UserType) => {
    console.log(user);
    setUser(currUser);
  };
  const removeUser = () => {
    setUser(null);
  };
  const fetchUser = async () => {
    // console.log('fetching');
    try {
      // const data: any = await axios.get('http://localhost:5000/api/v1/auth/me');
      const data: any = await fetch(
        'http://localhost:5000/api/v1/auth/me'
      ).then((res) => res.json());
      console.log(data);
      saveUser(data.user);
    } catch {
      console.error('error');
      removeUser();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  // console.log(user);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
