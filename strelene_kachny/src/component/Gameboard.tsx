import React, { useContext, useState } from "react";
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData, Color } from "../types";
import { duckImages, getduckImages } from "../data/data.tsx";
import styles from "./Gameboard.module.css";


const Gameboard = () => {
  const { state, startGame, dispatch } = useContext(GameContext);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Stav pro uchování vybrané pozice pro střelbu
  const [showAimOptions, setShowAimOptions] = useState(false); // Declare showAimOptions variable
  const [showShootOptions, setShowShootOptions] = useState(false); // Declare showShootOptions variable
  const aimPositions = state.fields.reduce((acc: number[], field, index) => {
    if (field.aim) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  const handleShoot = (index: number) => {
    if (selectedPosition === null) {
      alert("Please select a position before shooting.");
      return;
    }
    dispatch({ type: ActionCard.SHOOT, index: selectedPosition, duck_id: state.deck[selectedPosition]?.id });
  };
  
  const handleDoubleShoot = (index1: number, index2: number) => {
    if (Math.abs(index1 - index2) !== 1) {
      alert("The positions must be adjacent.");
      return;
    }
    dispatch({ type: ActionCard.DOUBLE_THREAT, index: 0 });
  };
  return (
    <div>
      <h1>Gameboard</h1>
      <button onClick={(_e) => {
        startGame(4);
      }}>Start game</button>
      <button onClick={() => setShowShootOptions(!showShootOptions)}>SHOOT</button>
      <button onClick={() => setShowAimOptions(!showAimOptions)}>AIM</button>
      {showShootOptions && (
        <>
              {aimPositions.map((aimIndex) => (
        <button key={aimIndex} onClick={() => handleShoot(aimIndex)}>Shoot at position {aimIndex + 1}</button>
      ))}
        </>
      )
        }
      {showAimOptions && (
  <>
    <button onClick={() => {
      setSelectedPosition(0);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 0 });
    }}>Aim at position 1</button>
    <button onClick={() => {
      setSelectedPosition(1);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 1 });
    }}>Aim at position 2</button>
    <button onClick={() => {
      setSelectedPosition(2);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 2 });
    }}>Aim at position 3</button>
    <button onClick={() => {
      setSelectedPosition(3);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 3 });
    }}>Aim at position 4</button>
    <button onClick={() => {
      setSelectedPosition(4);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 4 });
    }}>Aim at position 5</button>
    <button onClick={() => {
      setSelectedPosition(5);
      dispatch({ type: ActionCard.AIM_POSITION_SELECT, position: 5 });
    }}>Aim at position 6</button>
  </>
)}
<button onClick={(_e) => {
  handleDoubleShoot(0, 1); // Replace 0 and 1 with the actual positions
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
        dispatch({ type: ActionCard.MISS, index: 0, duck_id: state.deck[1]?.id ?? 0 });
      }}>Miss</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.LEHARO, index: 0 });
      }}>Leháro</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.CHVATAM, index: 1 });
      }}>Chvátám</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.TURBODUCK, index: 5 });
      }}>Turbo</button>
      {state.fields.map((field, index) => {
        return (
<Field key={index} index={index} data={field} dispatch={dispatch} setSelectedPosition={setSelectedPosition} selectedPosition={selectedPosition} showAimOptions={showAimOptions} />        )
      })}
    </div>
  )
}

const Field: React.FC<{ data: FieldData, index: number, dispatch: React.Dispatch<any>, setSelectedPosition: React.Dispatch<React.SetStateAction<number | null>>, selectedPosition: number | null, showAimOptions: boolean }> = ({ data, index, dispatch, setSelectedPosition, selectedPosition, showAimOptions }) => {
  const { state: gameState } = useContext(GameContext);
  const duckColor = gameState.deck[index]?.color ?? undefined;

  return (
    <div className={styles.table}>
      {gameState.winner === undefined ?
        <div className={styles.table__cards}>
        <p>Field</p>
        <p>Duck: {duckColor}</p>
        <img src={getduckImages(duckColor)} alt={`Duck of color ${duckColor}`} />
        <button onClick={() => {
          setSelectedPosition(index);
        }}>Select</button>
        {selectedPosition === index && <div>Selected</div>}
        {data.aim ? "🎯" : ""}
      </div>
      :
      <div>
        <p>Winner: {gameState.winner}</p>
      </div>
      }
    </div>
  )
}

export default Gameboard;