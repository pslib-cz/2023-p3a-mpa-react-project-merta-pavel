import React, { useContext, useState } from "react";
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData } from "../types";
import { duckImages } from "../data/data.tsx";

const Gameboard = () => {
  const { state, startGame, dispatch } = useContext(GameContext);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Stav pro uchování vybrané pozice pro střelbu

  return (
    <div>
      <h1>Gameboard</h1>
      <button onClick={(_e) => {
        startGame(4);
      }}>Start game</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.AIM, index: 0 });
      }}>Aim</button>
      <button onClick={(_e) => {
        // Před voláním akce "Shoot" ověříme, zda byla vybrána pozice
        if (selectedPosition === null) {
          alert("Please select a position before shooting.");
          return;
        }
        dispatch({type: ActionCard.SHOOT, index: 0, duck_id: state.deck[0]?.id});
      }}>Shoot</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.DOUBLE_THREAT, index: 0 });
      }}>Double threat</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.DOUBLE_SHOT, index: 0, duck_id: state.deck[0]?.id ?? 0, duck_id2: state.deck[1]?.id ?? 0 });
      }}>Double shot</button>
      <button onClick={(_e) => {
        dispatch({ type: ActionCard.DIVOKEJ_BILL, index: 0, duck_id: state.deck[0]?.id ?? 0 });
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
          <Field key={index} id={index} data={field} dispatch={dispatch} setSelectedPosition={setSelectedPosition} selectedPosition={selectedPosition} />
        )
      })}
    </div>
  )
}

const Field: React.FC<{ data: FieldData, id: number, dispatch: React.Dispatch<any>, setSelectedPosition: React.Dispatch<React.SetStateAction<number | null>>, selectedPosition: number | null }> = ({ data, id, dispatch, setSelectedPosition, selectedPosition }) => {
  const { state } = useContext(GameContext);
  const duckColor = state.deck[id]?.color;
  const duckImage = duckColor ? duckImages[duckColor] : undefined;

  return (
    <div>
      {id === 0 && (
        <>
          {/* Tlačítka pro výběr pozice */}
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
      <p>Field</p>
      <p>Duck: {duckColor}</p>
      {duckImage && <img src={duckImage.image} alt={`Duck of color ${duckColor}`} />}
      {data.aim ? "🎯" : ""}
    </div>
  )
}

export default Gameboard;
