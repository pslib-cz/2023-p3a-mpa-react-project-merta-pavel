import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../provider/provider";
import { useContext } from "react";
import { ActionCard } from "../types";

interface IInputProps {
    index: number;
}

const Input = ({index}: IInputProps) => {
    const { dispatch } = useContext(GameContext);
    const playRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input ref={playRef}  type="text"/>
            <button onClick={() => {
                dispatch({type: ActionCard.SET_PLAYER_NAME, player: index, name: playRef.current?.value ?? ""});
            }}>Submit</button>
        </div>
    );
}

const Settings = () => {
    const [playerCount, setPlayerCount] = useState(0);
    const {startGame, dispatch} = useContext(GameContext);
    return (
        <div>
            <h1>Nastavení</h1>
            <input onChange={(_e) => {
                setPlayerCount(Number(_e.target.value))
                dispatch({type: ActionCard.SET_PLAYER_COUNT, playerCount: Number(_e.target.value)});
            }} type="number"/>
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