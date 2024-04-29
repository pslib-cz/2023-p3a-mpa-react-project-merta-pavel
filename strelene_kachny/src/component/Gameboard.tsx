import React, { useContext } from "react"
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData } from "../types";

const Gameboard = () => {
  const {state, startGame, dispatch} = useContext(GameContext);

  return (
    <div>
      <h1>Gameboard</h1>
      <button onClick={(_e) => {
        startGame(4);
      }}>Start game</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.AIM, index: 0});
      }}>Aim</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.SHOOT, index: 0, duck_id: state.deck[0]?.id});
      }}>Shoot</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.DOUBLE_THREAT, index: 0});
      }}>Double threat</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.DOUBLE_SHOT, index: 0, duck_id: state.deck[0]?.id ?? 0, duck_id2: state.deck[1]?.id ?? 0});
      }}>Double shot</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.DIVOKEJ_BILL, index: 0, duck_id: state.deck[0]?.id ?? 0});
      }}>Divokej Bill</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.AIM_RIGHT, index: 0});
      }}>Aim right</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.AIM_LEFT, index: 1});
      }}>Aim left</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.MISS, index: 0, duck_id: state.deck[1]?.id ?? 0});
      }}>Miss</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.LEHARO, index: 0});
      }}>Leháro</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.CHVATAM, index: 1});
      }}>Chvátám</button>
      <button onClick={(_e) => {
        dispatch({type: ActionCard.TURBODUCK, index: 5});
      }}>Turbo</button>
      {state.fields.map((field, index) => {
        return (
          <Field key={index} id={index} data={field} />
        )
      })}
    </div>
  )
}

const Field : React.FC<{data: FieldData, id: number}> = ({data, id}) => {
  const {state} = useContext(GameContext);

  return (
    <div>
      <p>Field</p>
      <p>Duck: {state.deck[id]?.color}</p>
      {data.aim ? "🎯" : ""}
    </div>
  )
}


export default Gameboard;