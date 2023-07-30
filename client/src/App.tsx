import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Register, UiRouter } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<UiRouter />} />
      </Routes>
    </>
  );
}

export default App;
