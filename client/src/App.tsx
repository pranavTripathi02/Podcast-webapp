import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './utils/ProtectedRoute';
import { Login, Register, Home, Podcasts } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path='/podcasts' element={<Podcasts />} />
        </Route>
        {/* <Route path='/' element={< />} />
          <Route path='/' element={<temp />} /> */}
      </Routes>
    </>
  );
}

export default App;
