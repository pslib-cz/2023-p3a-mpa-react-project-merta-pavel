import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export function AppRoute() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Play</Link>
            </li>
            <li>
              <Link to="/quit">Quit</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Play />} />
          <Route path="/quit" element={<Quit />} />
        </Routes>
      </div>
    </Router>
  );
}

function Play() {
  return <h2>Play</h2>;
}

function Quit() {
  return <h2>Quit</h2>;
}

export default AppRoute;