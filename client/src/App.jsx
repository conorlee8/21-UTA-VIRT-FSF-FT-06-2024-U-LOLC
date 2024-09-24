import './App.css';
import { Outlet } from 'react-router-dom';
import AppNavbar from './components/NavBar';

function App() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default App;
