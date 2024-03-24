import React from 'react';
import { Duck } from '../models/Duck';

interface GameBoardProps {
    ducks: Duck[];
}

const GameBoard: React.FC<GameBoardProps> = ({ ducks }) => {
    return (
        <div className="game-board">
            {ducks.map((duck) => (
                <div key={duck.id} className={`duck ${duck.color}`}></div>
            ))}
        </div>
    );
};

export default GameBoard;
