import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu: React.FC = () => {
  return (
    <div>
        <h1>Hlavní Menu</h1>
      <Link to="/component">
        <div>
          Play Game
        </div>
      </Link>
      </div>
  );
};

export default MainMenu;