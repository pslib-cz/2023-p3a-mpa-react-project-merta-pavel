import React, { createContext, useCallback, useReducer } from 'react';
import { ActionCard, Color, Duck, GameState } from '../types';

// Define the initial state for your context
interface GameContextState {
  state: GameState;
  startGame: (playerCount: number) => Promise<void>;
  handleActionCard: (card: ActionCard,index: number, duck_ids?: number[]) => void;
}

function getNthEnumValue<T extends object>(enumObject: T, index: number): T[keyof T] | undefined {
  const keys = Object.keys(enumObject).filter(key => typeof enumObject[key as keyof T] === 'number');
  return enumObject[keys[index] as keyof T];
}

// Define the action types
type GameAction = { type: GameActionType.AIM; index: number; } |
{ type: GameActionType.ADD_DUCKS; players: number } |
{ type: GameActionType.SHUFFLE;} |
{ type: GameActionType.SHOOT; index: number; duck_id?: number; } |
{ type: GameActionType.REMOVE_AIM; index: number; };

export enum GameActionType {
  AIM = 'AIM',
  SHOOT = 'SHOOT',
  ADD_DUCKS = 'ADD_DUCKS',
  SHUFFLE = 'SHUFFLE',
  REMOVE_AIM = 'REMOVE_AIM',
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
      console.log(action);
      console.log(state.deck[action.index])
      if (state.fields[action.index].aim === false) return state;

      if (action.duck_id && state.deck[action.index]?.id === action.duck_id) {
        console.log('hit');
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
        
        for (let i = 0; i < action.players; i++) {
          const c = getNthEnumValue(Color, i);
          if (c === undefined) break;
          state.players.push({ color: c, deadDucks: 0 });
        }


        let duckId = 1;
        state.players.map((p, _i) =>{
          for (let j = 0; j < 5; j++) {
            newDeck.push({ color: p.color, id: duckId++ });          
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
    case GameActionType.REMOVE_AIM:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.index ? { ...field, aim: false } : field
        ),
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

  const startGame = useCallback(async (playerCount: number) => {
    dispatch({ type: GameActionType.ADD_DUCKS, players: playerCount });
    dispatch({ type: GameActionType.SHUFFLE });
  },[state]);

  const handleActionCard = useCallback((card: ActionCard, index: number, duck_ids?: number[]) => {
    switch (card) {
      case ActionCard.AIM:
        dispatch({ type: GameActionType.AIM, index });
        break;
      case ActionCard.SHOOT:
        dispatch({ type: GameActionType.SHOOT, index, duck_id: duck_ids ? duck_ids[0] : undefined });
        break;
      case ActionCard.DIVOKEJ_BILL:
        dispatch({ type: GameActionType.AIM, index });
        dispatch({ type: GameActionType.SHOOT, index, duck_id: duck_ids ? duck_ids[0] : undefined});
        break;
      case ActionCard.DOUBLE_THREAT:
        dispatch({ type: GameActionType.AIM, index });
        dispatch({ type: GameActionType.AIM, index: index + 1 });
        break;
      case ActionCard.DOUBLE_SHOT:
        dispatch({ type: GameActionType.SHOOT, index: index + 1, duck_id: duck_ids ? duck_ids[1] : undefined });
        dispatch({ type: GameActionType.SHOOT, index, duck_id: duck_ids ? duck_ids[0] : undefined });
        break;
      case ActionCard.AIM_LEFT:
        dispatch({ type: GameActionType.AIM, index: index - 1 });
        dispatch({ type: GameActionType.REMOVE_AIM, index });
        break;
      case ActionCard.AIM_RIGHT:
        dispatch({ type: GameActionType.AIM, index: index + 1 });
        dispatch({ type: GameActionType.REMOVE_AIM, index });
        break;
      case ActionCard.MISS:
        if (state.fields[index].aim === false) break;
        dispatch({ type: GameActionType.REMOVE_AIM, index });
        dispatch({ type: GameActionType.AIM, index: index+1 });
        dispatch({ type: GameActionType.SHOOT, index: index+1, duck_id: duck_ids ? duck_ids[0] : undefined});
        dispatch({ type: GameActionType.AIM, index: index+1 });
        dispatch({ type: GameActionType.SHOOT, index: index+1, duck_id: duck_ids ? duck_ids[0] : undefined});
        break;
    }
    
  },[state.deck, state.fields]);

  const contextValue: GameContextState = {
    state: state,
    startGame: startGame,
    handleActionCard: handleActionCard,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };