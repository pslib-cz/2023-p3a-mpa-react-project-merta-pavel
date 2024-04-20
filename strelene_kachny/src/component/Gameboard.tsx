import React, { useContext } from "react"
import { GameActionType, GameContext } from "../provider/provider";
import { Field as FieldData } from "../types";

const Gameboard = () => {
  const context = useContext(GameContext);


  return (
    <div>
      <h1>Gameboard</h1>
      <button onClick={() => {
          context?.dispatch({type: GameActionType.ADD_DUCKS});
          context?.dispatch({type: GameActionType.SHUFFLE});
      }}>Add ducks</button>
      {context?.state.fields.map((field, index) => {
        return (
          <Field key={index} id={index} data={field} />
        )
      })}
    </div>
  )
}

const Field : React.FC<{data: FieldData, id: number}> = ({data, id}) => {
  const context = useContext(GameContext);

  return (
    <div>
      <p>Field</p>
      <p>Duck: {context?.state.deck[id]?.color}</p>
      <button onClick={(_e) => {
        context?.dispatch({type: GameActionType.AIM, index: id})
      }}>Aim</button>
      <button onClick={(_e) => {
        context?.dispatch({type: GameActionType.SHOOT, index: id, duck_id: id})
      }}>Shoot</button>
      {data.aim ? "🎯" : ""}
    </div>
  )
}


export default Gameboard;