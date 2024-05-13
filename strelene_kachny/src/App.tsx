import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import MainMenu from './page/MainMenu';
import './App.css';
import Gameboard from './component/Gameboard';
import Settings from './page/Settings';
import { GameProvider } from './provider/provider.tsx'

const App = () => {

  return (
    <GameProvider>
      <Router basename='/2023-p3a-mpa-react-project-merta-pavel'>
        <Routes>
          <Route path="/" element={<MainMenu />} />,
          <Route path="/settings" element={<Settings />} />,
          <Route path="/component" element={<Gameboard />} />,
        </Routes>
      </Router>
    </GameProvider>
  )
 /* const router = createBrowserRouter(
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
  )*/
}

export default App;