import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainMenu.module.css';

const MainMenu: React.FC = () => {
  return (
    <div className={styles.Menu}>
    <h1>Hlavní Menu</h1>
  <Link to="/settings">
    <div>
      Play Game
    </div>
  </Link>
  </div>
  );
};

export default MainMenu;