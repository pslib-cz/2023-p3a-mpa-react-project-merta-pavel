import React, { useContext } from 'react';
import { AppContext } from '../provider/provider';
import { ActionType, Action } from '../types';

const Component: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  
  const handlePlayCard = (playerIndex: number, cardIndex: number) => {
    dispatch({ type: Action.PLAY_CARD, payload: { playerIndex, cardIndex, kachnaIndex: 0, targetIndex: 0, targetIndex1: 0, targetIndex2: 0, cilIndex: 0 } });
  };
  
  const handleAim = (targetIndex: number) => {
    dispatch({ type: Action.ZAMERIT, payload: { playerIndex: 0, cardIndex: 0, kachnaIndex: 0, targetIndex, targetIndex1: 0, targetIndex2: 0, cilIndex: 0 } });
  };
  
  const handleShoot = (playerIndex: number, targetIndex: number) => {
    dispatch({ type: Action.VYSTRELIT, payload: { playerIndex, cardIndex: 0, kachnaIndex: 0, targetIndex, targetIndex1: 0, targetIndex2: 0, cilIndex: 0 } });
  };
  
  const handleShootRight = (playerIndex: number, targetIndex: number) => {
    dispatch({ type: Action.STRELEJ_VPRAVO, payload: { playerIndex, cardIndex: 0, kachnaIndex: 0, targetIndex, targetIndex1: 0, targetIndex2: 0, cilIndex: 0 } });
  };

  const handleShootLeft = (playerIndex: number, targetIndex: number) => {
    dispatch({ type: Action.STRELEJ_VLEVO, payload: { playerIndex, cardIndex: 0, kachnaIndex: 0, targetIndex, targetIndex1: 0, targetIndex2: 0, cilIndex: 0 } });
  };

  const renderCards = () => {
    return state.players.map((player, playerIndex) => (
      <div key={playerIndex}>
        <h2>Player {playerIndex}</h2>
        <div>
          {player.kachna.map((kachna, kachnaIndex) => (
            <div key={kachnaIndex}>
              <p>Kachna {kachnaIndex}: {String(kachna)}</p>
              {/* Zde můžete přidat další informace o kachně, např. její stav, zaměření, atd. */}
            </div>
          ))}
        </div>
        <button onClick={() => handlePlayCard(playerIndex, 0)}>Play Card</button>
        <button onClick={() => handleAim(0)}>Aim</button>
        <button onClick={() => handleShoot(playerIndex, 0)}>Shoot</button>
        <button onClick={() => handleShootRight(playerIndex, 0)}>Shoot Right</button>
        <button onClick={() => handleShootLeft(playerIndex, 0)}>Shoot Left</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Střelené kachny</h1>
      <p>Current Player: {state.currentPlayer}</p>
      {renderCards()}
    </div>
  );
};

export default Component;
