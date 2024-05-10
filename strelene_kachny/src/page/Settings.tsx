import { useRef } from "react";
import { Link } from "react-router-dom";
import { GameContext } from "../provider/provider";
import { useContext } from "react";

const Input = () => {
    const { dispatch } = useContext(GameContext);
    const playRef = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input ref={playRef}  type="number"/>
            <button>Submit</button>
        </div>
    );
}

const Settings = () => {
const playRef = useRef<HTMLInputElement>(null);
const {startGame} = useContext(GameContext);

<input ref={playRef} type="number"/>
    return (
        <div>
            <input ref={playRef} type="number"/>
            <h1>Nastavení</h1>
            <Link to="/component">
            <button  onClick={() => {
                startGame(Number(playRef.current?.value) ?? 4);
            }}>
                Play Game
            </button>
            </Link>
        </div>
    );
};

export default Settings;