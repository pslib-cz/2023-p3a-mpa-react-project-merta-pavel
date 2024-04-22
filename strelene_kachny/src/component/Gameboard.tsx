import React, { useContext } from "react"
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData } from "../types";

const Gameboard = () => {
  const {state, startGame, handleActionCard} = useContext(GameContext);

  return (
    <div>
      <h1>Gameboard</h1>
      <button onClick={(_e) => {
        startGame(4);
      }}>Start game</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.AIM, 0);
      }}>Aim</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.SHOOT, 0, [state.deck[0]?.id ?? 0]);
      }}>Shoot</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.DOUBLE_THREAT, 0);
      }}>Double threat</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.DOUBLE_SHOT, 0, [state.deck[0]?.id ?? 0, state.deck[1]?.id ?? 0]);
      }}>Double shot</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.DIVOKEJ_BILL, 0, [state.deck[0]?.id ?? 0]);
      }}>Divokej Bill</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.AIM_RIGHT, 0);
      }}>Aim right</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.AIM_LEFT, 1);
      }}>Aim left</button>
      <button onClick={(_e) => {
        handleActionCard(ActionCard.MISS, 0, [state.deck[1]?.id ?? 0]);
      }}>Aim left</button>
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