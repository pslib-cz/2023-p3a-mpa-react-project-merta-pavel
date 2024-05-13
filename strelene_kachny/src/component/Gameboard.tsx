import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData, Player } from "../types";
import {  getActionCardImages, getduckImages } from "../data/data.tsx";
import styles from "./Gameboard.module.css";
import { Link } from "react-router-dom";


const Gameboard = () => {
  const { state, dispatch } = useContext(GameContext);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Stav pro uchování vybrané pozice pro střelbu
  const [showAimOptions, _setShowAimOptions] = useState(false); // Declare showAimOptions variable

  const handleExitGame = () => {
    dispatch({ type: ActionCard.RESET });
    console.log('handleExitGame called');
  }
  const renderActionCard = (card: ActionCard, index: number, player: Player) => {
    switch (card) {
      case ActionCard.SHOOT:
        return (
          <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
            dispatch({ type: ActionCard.SHOOT, index: selectedPosition ?? 0, duck_id: state.deck[selectedPosition ?? 0]?.id });
            dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
          }} src={getActionCardImages[ActionCard.SHOOT]} alt="Shoot"
          />
        );
      case ActionCard.AIM:
        return (
          <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
            dispatch({ type: ActionCard.AIM, index: selectedPosition ?? 0 })
            dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
          }} src={getActionCardImages[ActionCard.AIM]} alt="Aim"
          />
        );
      case ActionCard.DOUBLE_THREAT:
        return (
          <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
            dispatch({ type: ActionCard.DOUBLE_THREAT, index: selectedPosition ?? 0 })
            dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
          }} src={getActionCardImages[ActionCard.DOUBLE_THREAT]} alt="Double Threat"
          />
        );
        case ActionCard.DOUBLE_SHOT:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ 
                type: ActionCard.DOUBLE_SHOT, 
                index: selectedPosition ?? 0, 
                duck_id: state.deck[selectedPosition ?? 0]?.id ?? 0, 
                duck_id2: state.deck[(selectedPosition ?? 0) + 1]?.id ?? 0 
              }); 
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.DOUBLE_SHOT]} alt="Double Shot"
            />
          );
        case ActionCard.DIVOKEJ_BILL:
          return (
            <img
              key={index}
              className={state.currentPlayer !== player.color ? styles.disabled : ""}
              src={getActionCardImages[ActionCard.DIVOKEJ_BILL]}
              alt="Divokej Bill"
              onClick={() => {
                dispatch({
                  type: ActionCard.DIVOKEJ_BILL,
                  index: selectedPosition ?? 0,
                  duck_id: state.deck[selectedPosition ?? 0]?.id ?? 0,
                });
                dispatch({
                  type: ActionCard.USE_CARD,
                  player: player.color,
                  cardIndex: index,
                });
              }}
            />
          );
        case ActionCard.AIM_RIGHT:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} src={getActionCardImages[ActionCard.AIM_RIGHT]} alt="Aim Right" onClick={() => {
              dispatch({ type: ActionCard.AIM_RIGHT, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0} as { type: ActionCard.AIM_RIGHT; index: number; duck_id: number })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}  
            />
          );
        case ActionCard.AIM_LEFT:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ type: ActionCard.AIM_LEFT, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0} as { type: ActionCard.AIM_LEFT; index: number; duck_id: number })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.AIM_LEFT]} alt="Aim Left"
            />
          );
        case ActionCard.MISS:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ type: ActionCard.MISS, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0 })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.MISS]} alt="Miss"
            />
          );
        case ActionCard.LEHARO:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ type: ActionCard.LEHARO, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.LEHARO]} alt="Leharo"
            />
          );
        case ActionCard.CHVATAM:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ type: ActionCard.CHVATAM, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.CHVATAM]} alt="Chvatam"
            />
          );
        case ActionCard.TURBODUCK:
          return (
            <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
              dispatch({ type: ActionCard.TURBODUCK, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }} src={getActionCardImages[ActionCard.TURBODUCK]} alt="Turboduck"
            />
          );
          case ActionCard.MARCH:
            return (
              <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
                dispatch({ type: ActionCard.MARCH, });
                dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
              }} src={getActionCardImages[ActionCard.MARCH]} alt="March"
              />
            );
            case ActionCard.SHUFFLE:
              return (
                <img key={index} className={state.currentPlayer !== player.color ? styles.disabled : ""} onClick={() => {
                  dispatch({ type: ActionCard.SHUFFLE });
                  dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
                }} src={getActionCardImages[ActionCard.SHUFFLE]} alt="Shuffle"
                />
              );
        default:
          return state.currentPlayer === player.color ? <p key={index}>Unknown card</p> : <p key={index}>Unknown card</p>;
      }
  };

  return (
    <div className={styles.game}><div className={styles.up}>
      
    {state.players && state.players.map((player, index) => {
      useEffect(() => {
        if (player.hand.length < 3) {
          const cardsToAdd = 3 - player.hand.length;
          for (let i = 0; i < cardsToAdd; i++) {
        dispatch({ type: ActionCard.DRAW_ACTION_CARD, player: player.color, deck_length: state.actionCardDeck.length });
          }
        }
      }, [player.hand.length, player.color, state.actionCardDeck.length, dispatch]);
        
      return (
        <div className={styles.bar} key={index}>
          {state.currentPlayer === player.color && <>
          <h2>Player {index + 1}</h2>
          <div className={styles.Player}>
          <p className={styles.Player__Text}>Player name: {player.name}</p>
          <p className={styles.Player__Text}>Player color: {player.color}</p>
          <p className={styles.Player__Text}>Player dead ducks: {5 - state.deck.filter((d) => {
            return d?.color === player.color;
          }).length}</p>
          </div>
          <div>
          <p className={styles.cards}>{player.hand.map((card, index) => {
          return renderActionCard(card, index, player);})}</p>
          </div></>}
    </div>
  );
})}</div>
    {state.isRunning && state.winner === undefined ?
    <Link to="/">
    <button onClick={handleExitGame}>
      Exit Game
    </button>
    </Link> : ''}

    {state.winner !== undefined ?
    <Link to="/">
    <button onClick={handleExitGame}>
      Exit Game
    </button>
    </Link> : ''}
    <div  className={styles.map}>
    {state.fields.map((field, index) => {
        return (
          <Field key={index} index={index} data={field} dispatch={dispatch} setSelectedPosition={setSelectedPosition} selectedPosition={selectedPosition} showAimOptions={showAimOptions} />
        );
      })}
      </div>
    </div>
  );
}

const Field: React.FC<{ data: FieldData, index: number, dispatch: React.Dispatch<any>, setSelectedPosition: React.Dispatch<React.SetStateAction<number | null>>, selectedPosition: number | null, showAimOptions: boolean }> = ({ data, index, setSelectedPosition, selectedPosition }) => {
  const { state: gameState } = useContext(GameContext);
  const duckColor = gameState.deck[index]?.color ?? undefined;
  

  return (
    <div className={styles.table}>
    {gameState.winner === undefined ? (
      <div className={styles.table__cards}> 
        <p>Duck: {duckColor}</p>
        <img src="./img/rest/Oblaka.jpg" alt="Cloud"/>
        <img src={getduckImages(duckColor)} alt={`Duck of color ${duckColor}` } onClick={() => {
                    setSelectedPosition(index);
        }}/>
        {selectedPosition === index && <div>Selected</div>}
        {data.aim ? <img src="./img/rest/Terc.jpg" alt="Aim icon" /> : ""}
      </div>
    ) : (
      index === 0 && <div className={styles.message}><h2>Winner: Player color {gameState.winner}</h2></div>
    )}
  </div> 
  );  
}

export default Gameboard;