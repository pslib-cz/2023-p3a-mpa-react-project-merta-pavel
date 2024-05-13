export declare type GameState = {
    fields: Field[];
    deck: (Duck|undefined)[];
    actionCardDeck: ActionCard[];
    players: Player[];
    winner: Color | undefined;
    isRunning: boolean;
    currentPlayer: Color;
};

export declare type Field = {
    aim: boolean;
};

export declare type Duck = {
    id: number;
    color: Color;
};

export enum Color {
    BLUE = 0,
    YELLOW = 1,
    ORANGE = 2,
    GREEN = 3,
    PURPLE = 4,
    PINK = 5,
};

export enum ActionCard {
    AIM = 0,
    SHOOT = 1,
    DOUBLE_THREAT = 2,
    DOUBLE_SHOT = 3,
    MISS = 4,
    AIM_LEFT = 5,
    AIM_RIGHT = 6,
    DIVOKEJ_BILL = 7,
    MARCH = 8,
    LEHARO = 9,
    CHVATAM = 10,
    TURBODUCK = 11,
    AIM_POSITION_SELECT = 12,
    ADD_DUCKS = 400,
    SHUFFLE = 500,
    RESET = 600,
    SET_PLAYER_NAME = 700,
    SET_PLAYER_COUNT = 800,
    CREATE_ACTION_CARD_DECK = 900,
    DRAW_ACTION_CARD = 1000,
    USE_CARD = 1100,
};

export declare type Player = {
    color: Color;
    deadDucks: number; //just for faster and easier UI rendering, not used in the game logic
    name: string;
    hand: ActionCard[];
};