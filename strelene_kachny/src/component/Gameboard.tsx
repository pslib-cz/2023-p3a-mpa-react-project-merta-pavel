import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../provider/provider";
import { ActionCard, Field as FieldData, Player } from "../types";
import {  getduckImages } from "../data/data.tsx";
import styles from "./Gameboard.module.css";
import { Link } from "react-router-dom";


const Gameboard = () => {
  const { state, dispatch } = useContext(GameContext);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // Stav pro uchování vybrané pozice pro střelbu
  const [showAimOptions, _setShowAimOptions] = useState(false); // Declare showAimOptions variable
  const [showShootOptions, setShowShootOptions] = useState(false); // Declare showShootOptions variable
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const aimPositions = state.fields.reduce((acc: number[], field, index) => {
    if (field.aim) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  const handleNextTurn = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % state.players.length);
  };

  const handleShoot = (index: number, player: Player) => {
    if (selectedPosition === null) {
      alert("Please select a position before shooting.");
      return;
    }
    dispatch({ type: ActionCard.SHOOT, index: selectedPosition, duck_id: state.deck[selectedPosition]?.id });
    dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
  };
  

  const handleExitGame = () => {
    dispatch({ type: ActionCard.RESET });
    console.log('handleExitGame called');
  }


  const renderActionCard = (card: ActionCard, index: number, player: Player) => {
    switch (card) {
      case ActionCard.SHOOT:
        return (
          <>
        {selectedPosition !== null && state.fields[selectedPosition]?.aim !== undefined && state.fields[selectedPosition]?.aim ? (
          <>
            <button onClick={() => setShowShootOptions(!showShootOptions)}>SHOOT</button>
            {showShootOptions && (
          <>
            {aimPositions.map((aimIndex) => (
              <button key={aimIndex} disabled={state.currentPlayer !== player.color} onClick={() => {
            handleShoot(aimIndex, player);
            dispatch({ type: ActionCard.SHOOT, index: aimIndex, duck_id: state.deck[aimIndex]?.id });
              }}>Shoot at position {aimIndex + 1}</button>
            ))}
          </>
            )}
          </>
        ) : (
          <button disabled>SHOOT</button>
        )}
          </>
        );
      case ActionCard.AIM:
        return (
          <button key={index} disabled={state.currentPlayer !== player.color} onClick={() => {
            dispatch({ type: ActionCard.AIM, index: selectedPosition ?? 0 })
            dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
          }}>
            Aim
          </button>
        );
      case ActionCard.DOUBLE_THREAT:
        return (
          <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
            dispatch({ type: ActionCard.DOUBLE_THREAT, index: selectedPosition ?? 0 })
            dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
          }}>
            Double Threat
          </button>
        );
        case ActionCard.DOUBLE_SHOT:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.DOUBLE_SHOT, index: 0, duck_id: state.deck[0]?.id ?? 0, duck_id2: state.deck[1]?.id ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Double Shot
            </button>
          );
        case ActionCard.DIVOKEJ_BILL:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.DIVOKEJ_BILL, index: selectedPosition ?? 0, duck_id: state.deck[selectedPosition ?? 0]?.id ?? 0 })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Divokej Bill
            </button>
          );
        case ActionCard.AIM_RIGHT:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.AIM_RIGHT, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0} as { type: ActionCard.AIM_RIGHT; index: number; duck_id: number })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Aim Right
            </button>
          );
        case ActionCard.AIM_LEFT:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.AIM_LEFT, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0} as { type: ActionCard.AIM_LEFT; index: number; duck_id: number })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Aim Left
            </button>
          );
        case ActionCard.MISS:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.MISS, index: selectedPosition ?? 0, duck_id: state.deck[(selectedPosition ?? 0) +1]?.id ?? 0 })
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Miss
            </button>
          );
        case ActionCard.LEHARO:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.LEHARO, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Leharo
            </button>
          );
        case ActionCard.CHVATAM:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.CHVATAM, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Chvatam
            </button>
          );
        case ActionCard.TURBODUCK:
          return (
            <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
              dispatch({ type: ActionCard.TURBODUCK, index: selectedPosition ?? 0 });
              dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
            }}>
              Turbo Duck
            </button>
          );
          case ActionCard.MARCH:
            return (
              <button key={index} disabled={state.currentPlayer !==  player.color} onClick={() => {
                dispatch({ type: ActionCard.MARCH, });
                dispatch({ type: ActionCard.USE_CARD, player: player.color, cardIndex: index });
              }}>
                March
              </button>
            );
        default:
          return null;
      }
  };

  return (
    <div>
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
        <div key={index}>
          <h2>Player {index + 1}</h2>
          <p>Player name: {player.name}</p>
          <p>Player color: {player.color}</p>
          <p>Player dead ducks: {5 - state.deck.filter((d) => {
            return d?.color === player.color;
          }).length}</p>
      <p>Player hand: {player.hand.map((card, index) => {
        return renderActionCard(card, index, player);
})}</p>
    </div>
  );
})}
    <h1>Gameboard</h1>
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