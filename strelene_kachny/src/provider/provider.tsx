import React, { createContext, useReducer, ReactNode } from 'react';
import { Action, Card, GameState, Player, ActionCard, ActionType, ActionPayload } from '../types';

export const AppContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<ActionType<string>>;
}>({
  state: {} as GameState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: GameState = {
    players: [
      { deck: [], kachna: [], hand: [] },
      { deck: [], kachna: [], hand: [] },
      { deck: [], kachna: [], hand: [] },
    ],
    currentPlayer: 0,
    deck: [],
    discardPile: [],
    turn: 1,
    winner: -1,
    gameover: false,
    winnerMessage: '',
    target: [],
    goal: 0,
  };

  const reducer = (state: GameState, action: ActionType<string>): GameState => {
    switch (action.type) {
      case Action.PLAY_CARD: {
        const { playerIndex, cardIndex } = action.payload as { playerIndex: number; cardIndex: number };
        const currentPlayer = state.players[playerIndex];
        const updatedPlayer = {
          ...currentPlayer,
          deck: currentPlayer.deck.filter((_, index) => index !== cardIndex),
        };
        const updatedPlayers = [...state.players];
        updatedPlayers[playerIndex] = updatedPlayer;
        const updatedGameState = {
          ...state,
          players: updatedPlayers,
        };
        return updatedGameState;
      }
      case Action.ZAMERIT: {
        const targetIndex = (action.payload as { targetIndex: number }).targetIndex;
        
        if (!state.target.includes(targetIndex)) {
          return {
            ...state,
            target: [...state.target, targetIndex],
          };
        }
        
        return state;
      }
      
      
      case Action.VYSTRELIT: {
        const playerIndex = (action.payload as { playerIndex: number }).playerIndex;
        const targetIndex = (action.payload as { targetIndex: number }).targetIndex;

        const targetPlayer = state.players[targetIndex];
        const targetKachna = targetPlayer.kachna[0];
        if (state.target[targetIndex] !== playerIndex) {
          state.players[playerIndex].kachna.push(targetKachna);
          targetPlayer.kachna.splice(0, 1);
      
          for (let i = targetIndex; i < state.players.length - 1; i++) {
            state.players[i].kachna[0] = state.players[i + 1].kachna[0];
          }
          state.players[state.players.length - 1].kachna[0] = state.deck.pop() as Card;
      
          state.target[targetIndex] = playerIndex;
        }
      
        return { ...state };
      }
      case Action.DVOUTA_TREFA: {
        const playerIndex = (action.payload as { playerIndex: number }).playerIndex;
        const targetIndex1 = (action.payload as { targetIndex1: number }).targetIndex1;
        const targetIndex2 = (action.payload as { targetIndex2: number }).targetIndex2;

        const targetPlayer1 = state.players[targetIndex1];
        const targetPlayer2 = state.players[targetIndex2];
        const targetKachna1 = targetPlayer1.kachna[0];
        const targetKachna2 = targetPlayer2.kachna[0];
      
        if (state.target[targetIndex1] !== playerIndex && state.target[targetIndex2] !== playerIndex) {
          state.players[playerIndex].kachna.push(targetKachna1);
          state.players[playerIndex].kachna.push(targetKachna2);
          targetPlayer1.kachna.splice(0, 1); 
          targetPlayer2.kachna.splice(0, 1); 
      
          for (let i = targetIndex2; i < state.players.length - 2; i++) {
            state.players[i].kachna[0] = state.players[i + 2].kachna[0];
          }
          state.players[state.players.length - 2].kachna[0] = state.deck.pop() as Card;
          state.players[state.players.length - 1].kachna[0] = state.deck.pop() as Card;
      
          state.target[targetIndex1] = playerIndex;
          state.target[targetIndex2] = playerIndex;
        }
      
        return { ...state };
      }
      
      case Action.DVOUTA_HROZBA: {
        const playerIndex = (action.payload as { playerIndex: number }).playerIndex;
        const targetIndex1 = (action.payload as { targetIndex1: number }).targetIndex1;
        const targetIndex2 = (action.payload as { targetIndex2: number }).targetIndex2;
            
        const targetPlayer1 = state.players[targetIndex1];
        const targetPlayer2 = state.players[targetIndex2];
        const targetKachna1 = targetPlayer1.kachna[0]; 
        const targetKachna2 = targetPlayer2.kachna[0]; 
      
        if (state.target[targetIndex1] !== playerIndex && state.target[targetIndex2] !== playerIndex) {
          state.target[targetIndex1] = playerIndex;
          state.target[targetIndex2] = playerIndex;
      
          state.target[targetIndex1] = playerIndex;
          state.target[targetIndex2] = playerIndex;
      
          state.target[targetIndex1] = playerIndex;
          state.target[targetIndex2] = playerIndex;
        }
      
        return { ...state }; 
      }
      case Action.JEJDA_VEDELE: {
        const playerIndex = (action.payload ?? {}).playerIndex;
        const targetIndex = (action.payload ?? {}).targetIndex;
        if (state.target[targetIndex as number] !== playerIndex) {
          return state;
        }

        const targetPlayer = state.players[targetIndex as number ?? 0];
        const targetKachna = targetPlayer.kachna[0]; 

        state.target[targetIndex as number ?? 0] = -1;
        state.players[targetIndex as number ?? 0].kachna = [];
      
        return { ...state }; 
      }
      
      case Action.STRELEJ_VPRAVO: {
        const playerIndex = (action.payload ?? {}).playerIndex;
        const targetIndex = (action.payload ?? {}).targetIndex as number; 
      
        if (state.target[targetIndex] === -1) {
          return state;
        }
      
        const currentTargetIndex = state.target.indexOf(targetIndex);
        if (currentTargetIndex !== -1 && currentTargetIndex < 5) {
          state.target[currentTargetIndex] += 1;
        }
      
        return { ...state }; 
      }
      
      case Action.STRELEJ_VLEVO: {
        const { playerIndex, targetIndex } = action.payload as { playerIndex: number; targetIndex: number };
        const currentTargetIndex = state.target.indexOf(targetIndex);
        if (currentTargetIndex !== -1 && currentTargetIndex > 0) {
          state.target[currentTargetIndex] -= 1;
        }
        return state;
      }
      
      case Action.DVOJITA_HROZBA: {
        const { playerIndex, targetIndex1, targetIndex2 } = action.payload as { playerIndex: number; targetIndex1: number; targetIndex2: number };
      
        state.target.push(targetIndex1);
        state.target.push(targetIndex2);
      
        return state;
      }
      
      case Action.DIVOKEJ_BILL: {
        const { playerIndex, kachnaIndex } = action.payload as { playerIndex: number; kachnaIndex: number };

        state.players[playerIndex].kachna.splice(kachnaIndex, 1);
        
        const targetIndex = state.target.indexOf(kachnaIndex);
        if (targetIndex !== -1) {
          state.target.splice(targetIndex, 1);
        }
      
        return state;
      }
      
      case Action.KACHNI_TANEC: {
        const shuffledKachny = shuffle(state.players[state.currentPlayer].kachna);
        
        return {
          ...state,
          players: state.players.map((player, index) => {
            if (index === state.currentPlayer) {
              return {
                ...player,
                kachna: shuffledKachny,
              };
            }
            return player;
          }),
        };
      }
      
      function shuffle(array: any[]) {
        const newArray = array.slice();
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      }
      
      case Action.KACHNI_POCHOD: {
        const movedKachny = moveKachnyForward(state.players[state.currentPlayer].kachna);
      
        const newKachna = addCardFromDeckToKachna(movedKachny, state.deck);

        return {
          ...state,
          players: state.players.map((player, index) => {
            if (index === state.currentPlayer) {
              return {
                ...player,
                kachna: newKachna,
              };
            }
            return player;
          }),
          deck: state.deck.slice(1),
        };
      }
      
      function moveKachnyForward(kachny: Card[]): Card[] {
        const movedKachny = [...kachny];
        for (let i = 0; i < movedKachny.length - 1; i++) {
          movedKachny[i] = movedKachny[i + 1];
        }
        return movedKachny;
      }
      
      function addCardFromDeckToKachna(kachny: Card[], deck: Card[]): Card[] {
        const newKachna = [...kachny];
        newKachna[newKachna.length - 1] = deck[0];
        return newKachna;
      }
      
      case Action.LEHARO: {
        let nextPlayerIndex = state.currentPlayer;
        do {
          nextPlayerIndex = (nextPlayerIndex + 1) % state.players.length;
        } while (state.players[nextPlayerIndex].kachna.length === 6);
      
        return {
          ...state,
          currentPlayer: nextPlayerIndex,
          turn: state.turn + 1,
        };
      }
      
      case Action.POHYB: {
        if (state.players[state.currentPlayer].kachna.length > 0) {
          const updatedPlayers = state.players.map((player, index) => {
            if (index === state.currentPlayer) {
              const movedKachny = player.kachna.map((kachna) => ({
                ...kachna,
                position: kachna.position - 1,
              }));
              return {
                ...player,
                kachna: movedKachny,
              };
            }
            return player;
          });
      
          return {
            ...state,
            players: updatedPlayers,
          };
        }
        return state;
      }
      
      case Action.ROSAMBO: {
        const updatedPlayers = state.players.map((player) => {
          const updatedHand = player.hand.slice().sort(() => Math.random() - 0.5);
          return { ...player, hand: updatedHand };
        });
      
        return { ...state, players: updatedPlayers };
      }
      
      case Action.TURBOKACHNA: {
        const playerIndex = action.payload?.playerIndex;

        const kachnaIndex = action.payload?.kachnaIndex;
      
        if (kachnaIndex === undefined || playerIndex === undefined || kachnaIndex < 0 || kachnaIndex >= state.players[playerIndex].kachna.length) {
          return state;
        }

        const rowCount = state.players[playerIndex].kachna.length;

        if (rowCount < 2) {
          return state;
        }

        const movedKachna = state.players[playerIndex].kachna.splice(kachnaIndex, 1)[0];
        state.players[playerIndex].kachna.unshift(movedKachna);
      
        return state;
      }
      
        case Action.VYBER_CILE: {
          const { playerIndex, cilIndex } = action.payload as { playerIndex: number; cilIndex: number };
          state.goal = cilIndex;
          return state;
        }
      
      case Action.VYBER_KARTY: {
        const { playerIndex, selectedCardIndex } = action.payload as unknown as { playerIndex: number; selectedCardIndex: number };
        const currentPlayer = state.players[playerIndex];

        const selectedCard = currentPlayer.deck[selectedCardIndex];

        return state;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
