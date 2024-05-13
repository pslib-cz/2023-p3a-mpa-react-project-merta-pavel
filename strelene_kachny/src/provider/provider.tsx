import React, { createContext, useReducer } from 'react';
import { ActionCard, Color, Duck, GameState, Player } from '../types';

function getNthEnumValue<T extends object>(enumObject: T, index: number): T[keyof T] | undefined {
  const keys = Object.keys(enumObject).filter(key => typeof enumObject[key as keyof T] === 'number');
  return enumObject[keys[index] as keyof T];
}

// Define the initial state for your context
interface GameContextState {
  state: GameState;
  startGame: (playerCount: number) => Promise<void>;
  dispatch: React.Dispatch<GameAction>;
  currentPlayer: number,
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
  | { type: ActionCard.ADD_DUCKS }
  | { type: ActionCard.SHUFFLE }
  | { type: ActionCard.MARCH; }
  | { type: ActionCard.LEHARO; index: number }
  | { type: ActionCard.CHVATAM; index: number }
  | { type: ActionCard.TURBODUCK; index: number }
  | { type: ActionCard.AIM_POSITION_SELECT; position: number }
  | { type: ActionCard.RESET;}
  | { type: ActionCard.SET_PLAYER_NAME; player: number; name: string; }
  | { type: ActionCard.SET_PLAYER_COUNT; playerCount: number; }
  | { type: ActionCard.CREATE_ACTION_CARD_DECK; deck_properties: {type: ActionCard, count: number}[]}
  | { type: ActionCard.DRAW_ACTION_CARD; player: Color; deck_length: number}
  | { type: ActionCard.USE_CARD; player: number; cardIndex: number}
;

// Define the reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === ActionCard.RESET) {
    return {
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
      actionCardDeck: [],
      players: [],
      winner: undefined,
      isRunning: false,
      currentPlayer: Color.BLUE,
    };
  }
  if (state.deck.length === 6) {
    for (let card of state.deck) {
      if (card !== undefined && card !== null) {
        return {
          ...state,
          winner: card.color,
        }
      }
    }
  }
  switch (action.type) {
    case ActionCard.DRAW_ACTION_CARD:
      const stateCopy = JSON.parse(JSON.stringify(state)) as GameState;
      if (stateCopy.actionCardDeck.length !== action.deck_length) return state;
      const result = {
        ...stateCopy,
        players: stateCopy.players.map((player, _i) => {
          const card = stateCopy.actionCardDeck.splice(0, 1)[0];
          return player.color === action.player ? { ...player, hand: [...player.hand, card] } : player;
        }),
      };
      console.log(result)
      return result; 
    case ActionCard.CREATE_ACTION_CARD_DECK:
      const newActionCardDeck = [] as (ActionCard)[];
      for (let deck_property of action.deck_properties) {
        for (let i = 0; i < deck_property.count; i++) {
          newActionCardDeck.push(deck_property.type);
        }
      }
      return {
        ...state,
        actionCardDeck: newActionCardDeck,
      }
    case ActionCard.SET_PLAYER_NAME:
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === action.player ? { ...player, name: action.name } : player
        ),
      };
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
      case ActionCard.MARCH:
        const newDeckForMarch = [...state.deck];
        const firstElement = newDeckForMarch.shift();
        if (firstElement) {
          newDeckForMarch.push(firstElement);
        }
        return {
          ...state,
          deck: newDeckForMarch,
        };
    case ActionCard.LEHARO:
      const newDeckForLeharo = [...state.deck];
      if (action.index < newDeckForLeharo.length - 1) {
        const temp = newDeckForLeharo[action.index];
        newDeckForLeharo[action.index] = newDeckForLeharo[action.index + 1];
        newDeckForLeharo[action.index + 1] = temp;
      }
      return {
        ...state,
        deck: newDeckForLeharo,
      };
      case ActionCard.CHVATAM:
        const newDeckForChvatam = [...state.deck];
        if (action.index <= newDeckForChvatam.length) {
          const temp = newDeckForChvatam[action.index];
          newDeckForChvatam[action.index] = newDeckForChvatam[action.index - 1];
          newDeckForChvatam[action.index - 1] = temp;
        }
        return {
          ...state,
          deck: newDeckForChvatam,
        };
    case ActionCard.TURBODUCK:
          const newDeckForTurbo = [...state.deck];
          if (action.index < newDeckForTurbo.length) {
            const element = newDeckForTurbo[action.index];
            newDeckForTurbo.splice(action.index, 1); // remove element from its current position
            newDeckForTurbo.unshift(element); // add element to the beginning
          }
          return {
            ...state,
            deck: newDeckForTurbo,
            isRunning: true,
          };
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

    case ActionCard.SET_PLAYER_COUNT:
      const newPlayers = Array.from({ length: action.playerCount }, (_, i) => ({
        color: getNthEnumValue(Color, i) as Color,
        deadDucks: 0,
        name: '',
        hand: [],
      })) as Player[];
      return {
        ...state,
        players: newPlayers,
      };
    case ActionCard.ADD_DUCKS:
  // Create new players and ducks
  const newDucks = state.players.flatMap(player =>
    Array.from({ length: 5 }, (_, i) => ({ color: player.color, id: i + 1 }))
  ) as (Duck | undefined)[];  // Assert the result is an array of Ducks
  for (let i = 0; i < 5; i++){
    newDucks.push(undefined);
  }
  return {
    ...state,
    deck: newDucks,
  };
  
    case ActionCard.SHUFFLE:
        // Shuffle the deck
        const shuffledDeck = [...state.deck];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }

        // Shuffle the action card deck
        const shuffledActionCardDeck = [...state.actionCardDeck];
        for (let i = shuffledActionCardDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledActionCardDeck[i], shuffledActionCardDeck[j]] = [shuffledActionCardDeck[j], shuffledActionCardDeck[i]];
        }

        return {
          ...state,
          deck: shuffledDeck,
          actionCardDeck: shuffledActionCardDeck,
        };
        case ActionCard.AIM_POSITION_SELECT:
          return {
            ...state,
            fields: state.fields.map((field, index) =>
              index === action.position ? { ...field, aim: true } : field
            ),
          };
          case ActionCard.USE_CARD:
            // After a card is used, increment currentPlayer
            let nextPlayer = state.currentPlayer + 1;
            // If we've gone past the end of the array, wrap around to the first player
            if (nextPlayer >= state.players.length) {
              nextPlayer = 0;
            }
            // Remove the used card from the current player's hand
            const newHand = state.players[state.currentPlayer].hand.filter((_, cardIndex) => cardIndex !== action.cardIndex);
          
            return {
              ...state,
              currentPlayer: nextPlayer,
              players: state.players.map((player, index) =>
                index === state.currentPlayer ? { ...player, hand: newHand } : player
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
    actionCardDeck: [],
    players: [],
    winner: undefined,
    isRunning: false,
    currentPlayer: Color.BLUE,
  });

  const startGame = async (_playerCount: number) => {
    dispatch({ type: ActionCard.ADD_DUCKS});
    dispatch({ type: ActionCard.CREATE_ACTION_CARD_DECK, 
      deck_properties: [{type: ActionCard.AIM, count: 22}, {type: ActionCard.SHOOT, count: 25}, {type: ActionCard.DOUBLE_THREAT, count: 12}, {type: ActionCard.DOUBLE_SHOT, count: 15}, {type: ActionCard.MISS, count: 16}, {type: ActionCard.AIM_LEFT, count: 15}, {type: ActionCard.AIM_RIGHT, count: 15}, {type: ActionCard.DIVOKEJ_BILL, count: 5}, {type: ActionCard.MARCH, count: 8}, {type: ActionCard.LEHARO, count: 8}, {type: ActionCard.CHVATAM, count: 7}, {type: ActionCard.TURBODUCK, count: 8}, {type: ActionCard.SHUFFLE, count: 5}]});
    dispatch({ type: ActionCard.SHUFFLE });
  };

  const contextValue: GameContextState = {
    state: state,
    startGame: startGame,
    dispatch: dispatch,
    currentPlayer: 0,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };