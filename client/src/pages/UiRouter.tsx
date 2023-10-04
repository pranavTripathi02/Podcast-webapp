import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useState } from 'react';
import { Home, Help } from '../pages';
import Categories from './Categories';
import PodcastCategory from './PodcastCategory';
import Subscriptions from './Subscriptions';
import Modal from '../components/Modal';

export default function UiRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <Navbar
        sidebarStatus={isSidebarOpen}
        setSidebarStatus={setIsSidebarOpen}
      />
      <Sidebar sidebarStatus={isSidebarOpen} />
      <Modal />
      <section className='sm:max-w-lg md:max-w-lg lg:max-w-3xl m-auto w-lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<PodcastCategory />} />
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path='/subscriptions' element={<Subscriptions />} />
          </Route>
        <Route path='/help' element={<Help />} />
        </Routes>
      </section>
    </>
  );
}
