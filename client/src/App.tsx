import { Route, Routes } from 'react-router-dom';
import './App.css';
// import { Home, Podcasts, Podcast, AboutUs, ContactUs } from './pages';
import Podcasts from './pages/Podcasts';
import Home from './pages/Home';
// import Home from './pages/Home'
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <ProtectedRoute> */}
        <Route
          path='/podcasts'
          element={
            <ProtectedRoute>
              <Podcasts />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/' element={< />} />
          <Route path='/' element={<temp />} /> */}
        {/* </ProtectedRoute> */}
      </Routes>
    </>
  );
}

export default App;
