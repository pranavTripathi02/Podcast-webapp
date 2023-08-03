import React, { createContext, useState } from 'react';

type AuthType = {
  user: {
    user_email?: string;
    user_name?: string;
    // user_roles?: { Admin?: string; User?: string; Editor?: string };
    user_id: string;
    user_roles?: Array<string>;
  };
  accessToken?: string;
};

type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthType | null>(null);
  // const saveUser = (data: any) => {
  //   const { user: currUser, accessToken } = data;
  //   const newUser = { ...currUser, accessToken };
  //   setUser(newUser);
  // };
  // const fetchCurrUser = async () => {
  //   // //console.log('fetching');
  //   try {
  //     const data: any = await axios.get(
  //       'http://localhost:5000/api/v1/users/me',
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     // const data: any = await fetch(
  //     //   'http://localhost:5000/api/v1/auth/me'
  //     // ).then((res) => res.json());
  //     //console.log(data);
  //     // saveUser(data.user);
  //   } catch {
  //     console.error('error');
  //     // removeUser();
  //   }
  // };

  // useEffect(() => {
  //   fetchCurrUser();
  // }, []);
  // //console.log(user);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
