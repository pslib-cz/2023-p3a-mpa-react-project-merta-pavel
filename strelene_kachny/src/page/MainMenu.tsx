import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainMenu.module.css';

const MainMenu: React.FC = () => {
  return (
    <div className={styles.Menu}>
      <h1 className={styles.Text}>Střelené Kachny</h1>
    <h2 className={styles.Text}>Hlavní Menu</h2>
    <div className={styles.Menu__buttons}>
  <Link to="/settings">
    <button className={styles.Button}>
      Play Game
    </button>
  </Link>
  <Link to="/instructions">
    <button className={styles.Button}>
      Instructions
    </button>
  </Link>
  </div>
  </div>
  );
};

export default MainMenu;