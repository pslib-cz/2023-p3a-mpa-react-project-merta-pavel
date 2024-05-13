import { Link } from 'react-router-dom';
import instructions from '/navod/navod.pdf';
import styles from './MainMenu.module.css';

const Instructions = () => {
  return (
    <div>
      <h1>Instructions</h1>
      <div className={styles.Menu__buttons}>
      <a className={styles.Menu__buttons__a} href={instructions} target="_blank" rel="noreferrer">Open Instructions</a>
      <Link to="/">
        <button>
      Back to Main Menu
    </button>
    </Link>
    </div>
    </div>
    );
}

export default Instructions;