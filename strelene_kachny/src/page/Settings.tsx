import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../provider/provider";
import { useContext } from "react";
import { ActionCard } from "../types";
import styles from "./Settings.module.css";

interface IInputProps {
    index: number;
}

const Input = ({index}: IInputProps) => {
    const { dispatch } = useContext(GameContext);
    const playRef = useRef<HTMLInputElement>(null);
    return (
        <div className={styles.input}>
            <input ref={playRef}  type="text" placeholder="Jméno hráče"/>
            <button className={styles.input__button} onClick={() => {
                dispatch({type: ActionCard.SET_PLAYER_NAME, player: index, name: playRef.current?.value ?? ""});
            }}>Nastavit jméno</button>
        </div>
    );
}

const Settings = () => {
    const [playerCount, setPlayerCount] = useState(0);
    const {startGame, dispatch} = useContext(GameContext);
    return (
        <div>
            <h1 className={styles.Text}>Nastavení</h1>
            <input onChange={(_e) => {
                setPlayerCount(Number(_e.target.value))
                dispatch({type: ActionCard.SET_PLAYER_COUNT, playerCount: Number(_e.target.value)});
            }} type="number" placeholder="Počet hráčů 1-6"/>
            {Array.from({length: Number(playerCount) ?? 0}).map((_, index) => (
                <Input key={index} index={index}/>
            ))}
            <Link to="/component">
            <button  onClick={() => {
                startGame(playerCount);
            }}>
                Play Game
            </button>
            </Link>
        </div>
    );
};

export default Settings;