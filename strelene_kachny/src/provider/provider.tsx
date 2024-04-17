import React, { createContext, useReducer, ReactNode } from 'react';
import { actionType, Card, GameState, Action } from '../types'; // Importujeme potřebné typy

export const AppContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
}>({
  state: {} as GameState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => { 
  const initialState: GameState = {
    players: [
      { deck: [], kachna: [], id: 0},
      { deck: [], kachna: [], id: 1},
      { deck: [], kachna: [], id: 2},
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
    row: [],
  };

  function shuffle(array: any[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Implementace reduceru
  const reducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case actionType.ZAMERIT: {
          const { targetIndex, card } = action.payload;
          // Vložení karty zaměřovače na zvolené pole
          const updatedTarget = state.target.slice(); // Vytvoření kopie pole
          updatedTarget[targetIndex] = card.position; // Aktualizace cílového pole s pozicí karty zaměřovače
          return { ...state, target: updatedTarget };
        }
        case actionType.VYSTRELIT: {
          const { targetIndex, card } = action.payload;
          // Získání informací o kachnách na zvoleném poli
          const kachnaOnTarget = state.players.flatMap(p => p.deck).find(k => k.position === targetIndex);
          if (kachnaOnTarget) {
            // Zastřelení kachny na zvoleném poli
            const updatedPlayers = state.players.map(player => {
              const updatedKachna = player.kachna.filter(k => k.id !== targetIndex); // Odstranění zastřelené kachny
              return { ...player, kachna: updatedKachna };
            });
            // Přidání zastřelené kachny do odpovídajícího hráčova odstraňovacího balíčku
            const playerId = kachnaOnTarget.id; // Získání ID hráče, kterému patří zastřelená kachna
            const updatedDiscardPile = [...state.discardPile, kachnaOnTarget]; // Přidání zastřelené kachny do odpovídajícího hráčova odstraňovacího balíčku
        
            // Posunutí karet v řadě za zastřelenou kachnou o jedno pole dopředu a doplnění posledního pole v řadě
            const updatedDeck = state.deck.slice(); // Vytvoření kopie balíčku kachen
            const movedCard = updatedDeck.shift(); // Odebrání horní karty z balíčku
            if (movedCard) {
              const updatedRow = [...state.row.slice(1), movedCard]; // Posunutí karet v řadě a doplnění posledního pole
              return { ...state, players: updatedPlayers, discardPile: updatedDiscardPile, row: updatedRow };
            }
          } else {
            // Pokud na zvoleném poli není kachna, vraťte kartu zaměřovače zpět na balíček karet zaměřovačů
            const updatedDeck = [...state.deck, card];
            return { ...state, deck: updatedDeck };
          }
          return state; // Pokud se něco nepovede, vraťte původní stav
        }
        case actionType.DVOJITA_HROZBA: {
          const { targetIndex, card } = action.payload;
          const nextIndex = targetIndex + 1; // Index sousedního pole
        
          // Zkontrolovat, zda jsou dostupné karty zaměřovačů a sousední pole
          const hasTargetCards = state.deck.length >= 2; // Dostupné karty zaměřovačů
          const hasNextSpace = state.row.length > nextIndex; // Dostupné sousední pole
        
          if (hasTargetCards && hasNextSpace) {
            // Pokud jsou dostupné obě karty zaměřovačů a sousední pole
            const updatedDeck = state.deck.slice(2); // Odebrat dvě karty zaměřovačů z balíčku
        
            // Umístění dvou karet zaměřovačů nad dvě sousední pole v řadě
            const updatedRow = [...state.row];
            updatedRow[targetIndex] = { ...updatedRow[targetIndex] }; // První karta zaměřovače
            updatedRow[nextIndex] = { ...updatedRow[nextIndex] }; // Druhá karta zaměřovače
        
            return { ...state, deck: updatedDeck, row: updatedRow };
          } else if (hasTargetCards || hasNextSpace) {
            // Pokud je dostupný pouze jeden zaměřovač nebo pouze jedno sousední pole
            const updatedDeck = state.deck.slice(1); // Odebrat jednu kartu zaměřovače z balíčku
        
            // Umístění jedné karty zaměřovače nad jedno pole v řadě
            const updatedRow = [...state.row];
            const target = hasTargetCards ? targetIndex : nextIndex;
            updatedRow[target] = { ...updatedRow[target] };
        
            return { ...state, deck: updatedDeck, row: updatedRow };
          } else {
            // Pokud nejsou dostupné žádné karty zaměřovačů nebo žádná sousední pole, vrátit původní stav
            return state;
          }
        }        
        case actionType.DVOUTA_TREFA: {
          const { targetIndex } = action.payload;
          const nextIndex = targetIndex + 1; // Index následujícího pole
        
          // Zjistit, zda jsou dvě zaměřené kachny přímo za sebou v řadě
          const isFirstTarget = state.row[targetIndex].id; // ID první kachny
          const isSecondTarget = state.row[nextIndex]?.id; // ID druhé kachny
        
          if (isFirstTarget && isSecondTarget) {
            // Pokud jsou dvě zaměřené kachny přímo za sebou, zastřelit obě
            const updatedRow = [...state.row];
        
            // Odebrat zastřelené kachny z řady
            updatedRow.splice(targetIndex, 2);
        
            return { ...state, row: updatedRow };
          } else {
            // Pokud není možné zastřelit dvě zaměřené kachny přímo za sebou, vrátit původní stav
            return state;
          }
        }
        case actionType.JEJDA_VEDELE: {
          const { targetIndex } = action.payload;
        
          // Zjistit index předchozího pole
          const prevIndex = targetIndex - 1;
          // Zjistit index následujícího pole
          const nextIndex = targetIndex + 1;
        
          // Pokud je k dispozici předchozí pole
          if (prevIndex >= 0) {
            const updatedRow = [...state.row];
            // Odebrat kachnu a zaměřovač z předchozího pole
            updatedRow.splice(prevIndex, 2);
            return { ...state, row: updatedRow };
          }
          // Pokud je k dispozici následující pole
          else if (nextIndex < state.row.length) {
            const updatedRow = [...state.row];
            // Odebrat kachnu a zaměřovač z následujícího pole
            updatedRow.splice(nextIndex, 2);
            return { ...state, row: updatedRow };
          } else {
            // Pokud nejsou dostupné vhodné kachny ke zneškodnění, vrátit původní stav
            return state;
          }
        }
        case actionType.STRELEJ_VPRAVO: {
          const { targetIndex } = action.payload;
          const updatedRow = [...state.row];
        
          // Posunout kartu zaměřovače o jedno pole doprava, pokud je to možné
          if (targetIndex < state.row.length - 1) {
            const temp = updatedRow[targetIndex];
            updatedRow[targetIndex] = updatedRow[targetIndex + 1];
            updatedRow[targetIndex + 1] = temp;
          }
        
          return { ...state, row: updatedRow };
        }
        
        case actionType.STRELEJ_VLEVO: {
          const { targetIndex } = action.payload;
          const updatedRow = [...state.row];
        
          // Posunout kartu zaměřovače o jedno pole doleva, pokud je to možné
          if (targetIndex > 0) {
            const temp = updatedRow[targetIndex];
            updatedRow[targetIndex] = updatedRow[targetIndex - 1];
            updatedRow[targetIndex - 1] = temp;
          }
        
          return { ...state, row: updatedRow };
        }
        case actionType.DIVOKEJ_BILL: {
          const { targetIndex } = action.payload;
          const updatedRow = [...state.row];
        
          // Odstranit kachnu z řady
          updatedRow.splice(targetIndex, 1);
        
          // Pokud byla kachna zaměřená, najdeme index karty zaměřovače
          const targetCardIndex = state.row.findIndex(card => card.position === targetIndex);
          
          // Pokud byla nalezena karta zaměřovače, odstraníme ji z řady
          if (targetCardIndex !== -1) {
            updatedRow.splice(targetCardIndex, 1);
          }
        
          return { ...state, row: updatedRow };
        }
        case actionType.KACHNI_POCHOD: {
          // Posunout všechny karty v řadě o jedno pole doleva
          const updatedRow = [...state.row.slice(1), state.row[0]];
        
          // Vrátit první kartu (kachnu nebo kartu vody) do balíčku kachen
          const discardedCard = updatedRow.pop();
          if (discardedCard) {
            const updatedDeck = [discardedCard, ...state.deck];
        
            // Doplnit volné pole na konci řady horní kartou z balíčku kachen
            const topCardOfDeck = updatedDeck.pop();
            if (topCardOfDeck) {
              updatedRow.push(topCardOfDeck);
            }
        
            return { ...state, row: updatedRow, deck: updatedDeck };
          }
        
          return state;
        }
        case actionType.LEHARO: {
          const { card } = action.payload;
        
          // Najdeme index karty v řadě
          const targetIndex = state.row.findIndex(rowCard => rowCard.id === card.id);
        
          // Kontrola, zda není cílový index mimo rozsah pole nebo pokud je cílový index na konci řady
          if (targetIndex >= 0 && targetIndex < state.row.length - 1) {
            // Výměna karet mezi cílovým indexem a následujícím indexem
            const updatedRow = [...state.row];
            const temp = updatedRow[targetIndex];
            updatedRow[targetIndex] = updatedRow[targetIndex + 1];
            updatedRow[targetIndex + 1] = temp;
        
            return { ...state, row: updatedRow };
          }
        
          return state;
        }
        case actionType.CHVATAM: {
          const { card } = action.payload;
        
          // Najdeme index karty v řadě
          const targetIndex = state.row.findIndex(rowCard => rowCard.id === card.id);
        
          // Kontrola, zda není cílový index mimo rozsah pole nebo pokud je cílový index na začátku řady
          if (targetIndex > 0 && targetIndex < state.row.length) {
            // Výměna karet mezi cílovým indexem a předchozím indexem
            const updatedRow = [...state.row];
            const temp = updatedRow[targetIndex];
            updatedRow[targetIndex] = updatedRow[targetIndex - 1];
            updatedRow[targetIndex - 1] = temp;
        
            return { ...state, row: updatedRow };
          }
        
          return state;
        }
        case actionType.TURBOKACHNA: {
          const { card } = action.payload;
        
          // Najdeme index karty v řadě
          const targetIndex = state.row.findIndex(rowCard => rowCard.id === card.id);
        
          // Pokud karta není na začátku řady
          if (targetIndex > 0 && targetIndex < state.row.length) {
            // Přesuneme kartu na začátek řady
            const updatedRow = [...state.row];
            const movedCard = updatedRow.splice(targetIndex, 1)[0];
            updatedRow.unshift(movedCard);
        
            // Posuneme všechny karty za touto kartou o jedno pole dozadu
            for (let i = targetIndex; i < updatedRow.length; i++) {
              updatedRow[i].position--;
            }
        
            return { ...state, row: updatedRow };
          }
        
          return state;
        }
        case actionType.ROSAMBO: {
          // Vytvořit pole nových pozic
          const newPositions: number[] = [];
        
          // Hráč určí nové pozice pro každou kartu v řadě
          // Předpokládáme, že hráč poskytne pole nových pozic v odpovídajícím pořadí
          // Pokud by počet poskytnutých pozic neodpovídal počtu karet v řadě, můžeme zvolit jinou strategii
        
          // Příklad: Hráč určí nové pozice pro každou kartu v řadě manuálně
          const playerProvidedPositions = [2, 0, 4, 1, 3, 5];
        
          // Uložit nové pozice do pole
          playerProvidedPositions.forEach((position, index) => {
            newPositions.push(position);
          });
        
          // Aktualizovat pozice všech karet v řadě na základě nových pozic
          const updatedRow = state.row.map((rowCard, index) => {
            const newPosition = newPositions[index];
            return { ...rowCard, position: newPosition };
          });
        
          return { ...state, row: updatedRow };
        }
        case actionType.KACHNI_TANEC: {
          // Vezměte všechny karty v řadě
          const allCards = [...state.row];
          
          // Zamíchejte karty do balíčku kachen
          const shuffledCards = shuffle(allCards);
          
          // Vyberte nových šest karet z balíčku
          const newCards = shuffledCards.slice(0, 6);
          
          // Vyložte nové karty do řady zleva doprava
          return { ...state, row: newCards };
        }
        /*case actionType.ZIVY_STIT: {
          const { targetIndex }: { targetIndex: number } = action.payload; // Přidáním typu pro targetIndex
        
          // Najděte kachnu soupeře před nebo za zvolenou kachnou
          const opponentDuckIndex = findOpponentDuckIndex(state.row, targetIndex);
        
          if (opponentDuckIndex !== null) {
            // Skrýt zvolenou kachnu pod kachnou soupeře
            const updatedRow = [...state.row];
            updatedRow[opponentDuckIndex] = { ...updatedRow[opponentDuckIndex], isCovered: true };
            updatedRow[targetIndex] = { ...updatedRow[targetIndex], isHidden: true };
        
            // Posunout karty v řadě za skrývanou kachnou o jedno pole dopředu
            const startIndex = Math.min(targetIndex, opponentDuckIndex) + 1;
            const endIndex = Math.max(targetIndex, opponentDuckIndex);
            for (let i = startIndex; i <= endIndex; i++) {
              updatedRow[i - 1] = updatedRow[i];
            }
            updatedRow[endIndex] = { id: -1, color: '', isDead: false, active: false, img: '' }; // Vynulovat poslední kartu
        
            return { ...state, row: updatedRow };
          } else {
            // Pokud nebyla nalezena kachna soupeře před nebo za zvolenou kachnou, vrátit původní stav
            return state;
          }
        }
        
        function findOpponentDuckIndex(row: duckCard[], targetIndex: number): number | null {
          // Funkce prohledává pole karet typu duckCard, nikoli Card
          for (let i = 0; i < row.length; i++) {
            if (row[i].id !== -1 && i !== targetIndex) {
              // Pokud je to kachna soupeře před nebo za zvolenou kachnou
              if ((i < targetIndex && !row[i].isHidden) || (i > targetIndex && !row[targetIndex].isHidden)) {
                return i;
              }
            }
          }
          return null; // Kachna soupeře nebyla nalezena
        }*/
               
        case actionType.KACHNI_UNIK: {
          const { targetIndex } = action.payload;
        
          // Získání karty na zvoleném indexu v řadě
          const selectedDuck = state.row[targetIndex];
        
          // Pokud je vybraná karta platná a není již skrytá
          if (selectedDuck && !selectedDuck.isHidden) {
            // Nastavit kachnu jako skrytou
            const updatedRow: Card[] = [...state.row];
            updatedRow[targetIndex] = { ...updatedRow[targetIndex], isHidden: true };

            // Vytvoření nového stavu
            const newState: GameState = { ...state, row: updatedRow };

            // Vrátit nový stav
            return newState;
          } else {
            // Pokud vybraná karta není platná, vrátit původní stav
            return state;
          }
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
