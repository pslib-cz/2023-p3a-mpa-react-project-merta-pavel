import React, { createContext, useReducer } from 'react';
import { Color, Duck, GameState } from '../types';

// Define the initial state for your context
interface GameContextState {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Define the action types
type GameAction = { type: GameActionType.AIM; index: number; } |
{ type: GameActionType.ADD_DUCKS; } |
{ type: GameActionType.SHUFFLE;} |
{ type: GameActionType.SHOOT; index: number; duck_id: number; }

export enum GameActionType {
  AIM = 'AIM',
  SHOOT = 'SHOOT',
  ADD_DUCKS = 'ADD_DUCKS',
  SHUFFLE = 'SHUFFLE',
}

// Define the reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.AIM:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index ? { ...field, aim: true } : field
        ),
      };
    case GameActionType.SHOOT:
      if (state.fields[action.index].aim === false) return state;

      if (state.deck[action.index]?.id === action.duck_id) {
        state.deck.splice(action.index, 1);
      }

      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index ? { ...field, aim: false } : field
        ),
      };
      case GameActionType.ADD_DUCKS:
        let newDeck = [undefined, undefined, undefined, undefined, undefined] as (Duck|undefined)[];
        state.players.map((p, i) =>{
          for (let j = 0; j < 5; j++) {
            newDeck.push({ color: p.color, id: i*j });          
          }
        });
        return {
          ...state,
          deck: newDeck,
        }
    case GameActionType.SHUFFLE:
      let shuffledDeck = state.deck.slice();
      for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
      }
      return {
        ...state,
        deck: shuffledDeck,
      };
    default:
      return state;
  }
};

// Create a new context
const GameContext = createContext<GameContextState | undefined>(undefined);

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    fields: [
      { aim: false },
      { aim: false },
      { aim: false },
      { aim: false },
      { aim: false },
      { aim: false },
    ],
    deck: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    players: [
      { color: Color.BLUE, deadDucks: 0 },
      { color: Color.YELLOW, deadDucks: 0 },
      { color: Color.ORANGE, deadDucks: 0 },
    ],
  });

  const contextValue: GameContextState = {
    state: state,
    dispatch: dispatch,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };