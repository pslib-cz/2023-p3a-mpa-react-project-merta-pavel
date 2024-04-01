import { Action, ActionCard, Card, Player } from '../types';

// Definice akcí
enum ActionType {
    PLAY_CARD = 'PLAY_CARD',
    DRAW_CARD = 'DRAW_CARD',
    RESOLVE_ACTION = 'RESOLVE_ACTION',
}

const playCard = (playerIndex: number, cardIndex: number): Action<ActionType.PLAY_CARD, { playerIndex: number, cardIndex: number }> => ({
    type: ActionType.PLAY_CARD,
    payload: { playerIndex, cardIndex },
});

const drawCard = (playerIndex: number): Action<ActionType.DRAW_CARD, { playerIndex: number }> => ({
    type: ActionType.DRAW_CARD,
    payload: { playerIndex },
});

const resolveAction = (actionCard: ActionCard): Action<ActionType.RESOLVE_ACTION, { actionCard: ActionCard }> => ({
    type: ActionType.RESOLVE_ACTION,
    payload: { actionCard },
});

const initialState = {
    players: [
        { deck: [], kachna: [] },
        { deck: [], kachna: [] },
        { deck: [], kachna: [] },
    ],
    currentPlayer: 0,
    deck: [], 
    discardPile: [], 
    turn: 1,
    winner: -1, 
    gameover: false,
    winnerMessage: '', 
};

const reducer = (state = initialState, action: Action<ActionType, any>): any => {
    switch (action.type) {
        case ActionType.PLAY_CARD: {
            const { playerIndex, cardIndex } = action.payload;
            const player = state.players[playerIndex];
            const card = player.deck[cardIndex];


            return state; 
        }
        case ActionType.DRAW_CARD: {
            const { playerIndex } = action.payload;


            return state; 
        }
        case ActionType.RESOLVE_ACTION: {
            const { actionCard } = action.payload;

            return state; 
        }
        default:
            return state;
    }
};

export default reducer;
