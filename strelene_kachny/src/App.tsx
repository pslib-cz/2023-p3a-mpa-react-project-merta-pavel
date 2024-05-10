import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import MainMenu from './page/MainMenu';
import './App.css';
import Gameboard from './component/Gameboard';
import Settings from './page/Settings';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<MainMenu />} />,
      <Route path="/settings" element={<Settings />} />,
      <Route path="/component" element={<Gameboard />} />,
    ]),
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;