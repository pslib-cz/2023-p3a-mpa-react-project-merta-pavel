import React, { useContext, useState } from "react";
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData } from "../types";
import {  getduckImages } from "../data/data.tsx";
import styles from "./Gameboard.module.css";


const Gameboard = () => {
  const { state, startGame, dispatch } = useContext(GameContext);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Stav pro uchování vybrané pozice pro střelbu
  const [showAimOptions, _setShowAimOptions] = useState(false); // Declare showAimOptions variable
  const [showShootOptions, setShowShootOptions] = useState(false); // Declare showShootOptions variable
  const aimPositions = state.fields.reduce((acc: number[], field, index) => {
    if (field.aim) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  const handleShoot = (_index: number) => {
    if (selectedPosition === null) {
      alert("Please select a position before shooting.");
      return;
    }
    dispatch({ type: ActionCard.SHOOT, index: selectedPosition, duck_id: state.deck[selectedPosition]?.id });
  };

  const handleStartGame = () => {
    startGame(4);
    state.isRunning = true;
  };
  
  const handlePlayAgain = () => {
    dispatch({ type: ActionCard.RESET });
    console.log('handlePlayAgain called');
    startGame(4);
    console.log('startGame called');
  };

  return (
    <div>
    <h1>Gameboard</h1>
    {!state.isRunning && state.winner === undefined ? 
    <button onClick={handleStartGame}>{'Start Game'}</button> : ''}
    
    {state.winner !== undefined ?
    <button onClick={handlePlayAgain}>
      {'Play again'}
    </button> : ''}
      <button onClick={() => setShowShootOptions(!showShootOptions)}>SHOOT</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.AIM, index: selectedPosition ?? 0});
      }}>AIM</button>
      {showShootOptions && (
        <>
          {aimPositions.map((aimIndex) => (
            <button key={aimIndex} onClick={() => handleShoot(aimIndex)}>Shoot at position {aimIndex + 1}</button>
          ))}
        </>
      )}
      <button onClick={(_e) => {
        dispatch({type: ActionCard.DOUBLE_THREAT, index: selectedPosition ?? 0}) // Replace 0 and 1 with the actual positions
      }}>Double threat</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.DOUBLE_SHOT, index: 0, duck_id: state.deck[0]?.id ?? 0, duck_id2: state.deck[1]?.id ?? 0 });
      }}>Double shot</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.DIVOKEJ_BILL, index: selectedPosition ?? 0, duck_id: state.deck[selectedPosition ?? 0]?.id ?? 0 });
      }}>Divokej Bill</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.AIM_RIGHT, index: 0 });
      }}>Aim right</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.AIM_LEFT, index: 1 });
      }}>Aim left</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.MISS, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0 });
      }}>Miss</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.LEHARO, index: selectedPosition ?? 0});
      }}>Leháro</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.CHVATAM, index: selectedPosition ?? 0});
      }}>Chvátám</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.TURBODUCK, index: selectedPosition ?? 0 });
      }}>Turbo</button>
      {state.fields.map((field, index) => {
        return (
          <Field key={index} index={index} data={field} dispatch={dispatch} setSelectedPosition={setSelectedPosition} selectedPosition={selectedPosition} showAimOptions={showAimOptions} />
        )
      })}
    </div>
  )
}

const Field: React.FC<{ data: FieldData, index: number, dispatch: React.Dispatch<any>, setSelectedPosition: React.Dispatch<React.SetStateAction<number | null>>, selectedPosition: number | null, showAimOptions: boolean }> = ({ data, index, setSelectedPosition, selectedPosition }) => {
  const { state: gameState } = useContext(GameContext);
  const duckColor = gameState.deck[index]?.color ?? undefined;

  return (
    <div className={styles.table}>
      {gameState.winner === undefined ? (
        <div className={styles.table__cards}>
          <p>Field</p>
          <p>Duck: {duckColor}</p>
          <img src={getduckImages(duckColor)} alt={`Duck of color ${duckColor}`} />
          <button onClick={() => {
            setSelectedPosition(index);
          }}>Select</button>
          {selectedPosition === index && <div>Selected</div>}
          {data.aim ? <img src="\src\img\rest\Terc.jpg" alt="Aim icon" /> : ""}
        </div>
      ) : (
        index === 0 && <div><h2>Winner: Player {gameState.winner}</h2></div>
      )}
    </div> 
  )
}

export default Gameboard;