import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useState } from 'react';
import { Home, Podcasts } from '../pages';
import Categories from './Categories';
import PodcastCategory from './PodcastCategory';

export default function UiRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Navbar
        sidebarStatus={isSidebarOpen}
        setSidebarStatus={setIsSidebarOpen}
      />
      <Sidebar sidebarStatus={isSidebarOpen} />
      <section className='sm:max-w-lg md:max-w-lg lg:max-w-3xl m-auto w-lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<PodcastCategory />} />
          {/* <Route element={<ProtectedRoute allowedRoles={['user']} />}> */}
          {/* <Route path='/podcasts' element={<Podcasts />} /> */}
          {/* </Route> */}
          {/* <Route path='/' element={< />} />
          <Route path='/' element={<temp />} /> */}
        </Routes>
      </section>
    </>
  );
}
