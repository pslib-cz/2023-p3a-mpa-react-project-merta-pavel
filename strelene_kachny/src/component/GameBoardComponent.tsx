import React from 'react';
import { GameState, duckCard } from '../types'; // Import the duckCard type
import { DuckListComponent } from './DuckListComponent';
import { ActionCardListComponent } from './ActionCardListComponent';

type GameBoardProps = {
    gameState: GameState;
};

export const GameBoardComponent: React.FC<GameBoardProps> = ({ gameState }) => {
    const ducks: duckCard[] = gameState.players.flatMap(player => player.kachna); // Specify the type of ducks as duckCard[]
    
    return (
        <div>
            <DuckListComponent ducks={ducks} /> 
            <ActionCardListComponent cards={gameState.players.flatMap(player => player.deck)} />
        </div>
    );
};
