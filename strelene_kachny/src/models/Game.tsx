import { Duck } from './Duck';
import { Player } from './Player';

export interface Game {
    id: number;
    players: Player[];
    ducks: typeof Duck[];
    currentPlayer: Player;
    currentPlayerIndex: number;
    winner: Player | null;
    isFinished: boolean;
    isStarted: boolean;
}
