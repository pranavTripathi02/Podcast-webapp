import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/react.svg';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import LoginLogoutBtn from './LoginLogoutBtn';

export default function Navbar({
  sidebarStatus,
  setSidebarStatus,
}: {
  sidebarStatus: boolean;
  setSidebarStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { auth } = useAuth();
  console.log(auth?.user);
  return (
    <nav className='sticky top-0 h-12 bg-stone-600 flex justify-between p-2'>
      <div className='flex justify-between w-20'>
        <FontAwesomeIcon
          className=''
          size='2xl'
          icon={faBars}
          onClick={() => {
            setSidebarStatus(!sidebarStatus);
          }}
          cursor='pointer'
        />
        <img className='' src={logo} alt='logo' />
      </div>
      {/* <button
      // className={`${
      //   auth?.user
      //     ? 'hidden'
      //     : 'bg-sky-600 hover:bg-sky-700 rounded-md px-2 py-1'
      // }`}
      > */}
      <LoginLogoutBtn />
      {/* </button> */}
    </nav>
  );
}
