import React, { useContext } from 'react';
import { AppContext } from '../provider/provider';
import { ActionCardListComponent } from './ActionCardListComponent'; // Import ActionCardListComponent
import { Card } from '../types'; // Import Card

type GameBoardProps = {
  someCardData: any;
};

const GameBoardComponent: React.FC<GameBoardProps> = ({ someCardData }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleTargetClick = (index: number, action: string) => {
    // Zde by mělo dojít k odeslání akce na server
    // dispatch({ type: 'ACTION', payload: { index, action } });
  };
  return (
    <div className="game-board">
      {/* Zobrazíme hrací pole */}
      {state.row.map((card: Card, index) => (
        <div
          key={index}
          className="card"
          onClick={() => handleTargetClick(index, 'ZAMERIT')}
        >
          {/* Zobrazení akční karty */}

        </div>
      ))}
      {/* Tlačítka pro další akce */}
      {/* ... */}
    </div>
  );
};

export default GameBoardComponent;
