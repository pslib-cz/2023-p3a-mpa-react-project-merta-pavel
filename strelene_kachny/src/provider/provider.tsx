import React, { createContext, useReducer } from 'react';
import { ActionCard, Color, GameState, Player } from '../types';

function getNthEnumValue<T extends object>(enumObject: T, index: number): T[keyof T] | undefined {
  const keys = Object.keys(enumObject).filter(key => typeof enumObject[key as keyof T] === 'number');
  return enumObject[keys[index] as keyof T];
}

// Define the initial state for your context
interface GameContextState {
  state: GameState;
  startGame: (playerCount: number) => Promise<void>;
  dispatch: React.Dispatch<GameAction>;
}

// Define the action types
type GameAction = 
  | { type: ActionCard.AIM; index: number }
  | { type: ActionCard.SHOOT; index: number; duck_id?: number }
  | { type: ActionCard.DOUBLE_THREAT; index: number }
  | { type: ActionCard.DOUBLE_SHOT; index: number; duck_id?: number; duck_id2?: number}
  | { type: ActionCard.AIM_LEFT; index: number }
  | { type: ActionCard.AIM_RIGHT; index: number }
  | { type: ActionCard.MISS; index: number; duck_id?: number}
  | { type: ActionCard.DIVOKEJ_BILL; index: number; duck_id?: number }
  | { type: ActionCard.ADD_DUCKS; players: number }
  | { type: ActionCard.SHUFFLE };

// Define the reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionCard.AIM:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index ? { ...field, aim: true } : field
        ),
      };
    case ActionCard.SHOOT:
      if (state.fields[action.index].aim === false) return state;

      let newDeck = [...state.deck];
      if (action.duck_id && state.deck[action.index]?.id === action.duck_id) {
        newDeck.splice(action.index, 1);
      }

      return {
        ...state,
        deck: newDeck,
        fields: state.fields.map((field, index) =>
          index === action.index ? { ...field, aim: false } : field
        ),
      };
    case ActionCard.DOUBLE_THREAT:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index || index === action.index + 1 ? { ...field, aim: true } : field
        ),
      };
    case ActionCard.DOUBLE_SHOT:
        if (state.fields[action.index].aim === false) return state;
  
        let newDeckForDoubleShot = [...state.deck];
        if (action.duck_id && state.deck[action.index]?.id === action.duck_id) {
          const duckIndex = newDeckForDoubleShot.findIndex(duck => duck?.id === action.duck_id);
          if (duckIndex !== -1) {
            newDeckForDoubleShot.splice(duckIndex, 1);
          }
        }
        if (action.duck_id2 && state.deck[action.index + 1]?.id === action.duck_id2) {
          const duckIndex2 = newDeckForDoubleShot.findIndex(duck => duck?.id === action.duck_id2);
          if (duckIndex2 !== -1) {
            newDeckForDoubleShot.splice(duckIndex2, 1);
          }
        }
  
        return {
          ...state,
          deck: newDeckForDoubleShot,
          fields: state.fields.map((field, index) =>
            index === action.index || index === action.index + 1 ? { ...field, aim: false } : field
          ),
        };
    case ActionCard.AIM_LEFT:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index - 1 ? { ...field, aim: true } : { ...field, aim: false }
        ),
      };
    case ActionCard.AIM_RIGHT:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index + 1 ? { ...field, aim: true } : { ...field, aim: false }
        ),
      };
      case ActionCard.MISS:
      // Check if the aim is true at the current index
      if (state.fields[action.index]?.aim) {
        let newDeckForMiss = [...state.deck];

        // Try to shoot at index - 1 and index + 1
        [action.index - 1, action.index + 1].forEach((idx) => {
          // Check if the duck_id matches the id of the duck at the current index
          if (action.duck_id && state.deck[idx]?.id === action.duck_id) {
            // Find the index of the duck in the deck and remove it
            const duckIndex = newDeckForMiss.findIndex(duck => duck?.id === state.deck[idx]?.id);
            if (duckIndex !== -1) {
              newDeckForMiss.splice(duckIndex, 1);
            }
          }
        });

        return {
          ...state,
          deck: newDeckForMiss,
          fields: state.fields.map((field, index) =>
            index === action.index || index === action.index - 1 || index === action.index + 1 ? { ...field, aim: false } : field
          ),
        };
      }

      // If the aim is not true at the current index, return the state without any changes
      return state;
    case ActionCard.DIVOKEJ_BILL:
        // Aim
        const aimedState = {
          ...state,
          fields: state.fields.map((field, index) =>
            index === action.index ? { ...field, aim: true } : field
          ),
        };
  
        // Shoot
        if (aimedState.fields[action.index].aim === false) return aimedState;
  
        let newDivokejBillDeck = [...aimedState.deck];
        if (action.duck_id && aimedState.deck[action.index]?.id === action.duck_id) {
          newDivokejBillDeck.splice(action.index, 1);
        }
  
        return {
          ...aimedState,
          deck: newDivokejBillDeck,
          fields: aimedState.fields.map((field, index) =>
            index === action.index ? { ...field, aim: false } : field
          ),
        };
    case ActionCard.ADD_DUCKS:
  // Create new players and ducks
  const newPlayers = Array.from({ length: action.players }, (_, i) => {
    const color = getNthEnumValue(Color, i);
    // Skip if color is undefined
    if (color === undefined) return null;
    return { color, deadDucks: 0 };
  }).filter(player => player !== null) as Player[];  // Filter out nulls and assert the remaining items are Players

  const newDucks = newPlayers.flatMap(player =>
    Array.from({ length: 5 }, (_, i) => ({ color: player.color, id: i + 1 }))
  );

  return {
    ...state,
    players: newPlayers,
    deck: newDucks,
  };
  
      case ActionCard.SHUFFLE:
        // Shuffle the deck
        const shuffledDeck = [...state.deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
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
const GameContext = createContext<GameContextState | undefined>(undefined) as React.Context<GameContextState>;

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
    players: [],
  });

  const startGame = async (playerCount: number) => {
    dispatch({ type: ActionCard.ADD_DUCKS, players: playerCount });
    dispatch({ type: ActionCard.SHUFFLE });
  };

  const contextValue: GameContextState = {
    state: state,
    startGame: startGame,
    dispatch: dispatch,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };