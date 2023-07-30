import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useState } from 'react';
import { Home, Podcasts } from '../pages';

export default function UiRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Navbar
        sidebarStatus={isSidebarOpen}
        setSidebarStatus={setIsSidebarOpen}
      />
      <Sidebar sidebarStatus={isSidebarOpen} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path='/podcasts' element={<Podcasts />} />
        </Route>
        {/* <Route path='/' element={< />} />
          <Route path='/' element={<temp />} /> */}
      </Routes>
    </>
  );
}
