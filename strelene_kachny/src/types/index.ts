export declare type GameState = {
    fields: Field[];
    deck: (Duck|undefined)[];
    players: Player[];
};

export declare type Field = {
    aim: boolean;
};

export declare type Duck = {
    id: number;
    color: Color;
};


export enum Color {
    BLUE = "blue",
    YELLOW = "yellow",
    ORANGE = "orange",
    GREEN = "green",
    PURPLE = "purple",
    PINK = "pink",
};

export declare type Player = {
    color: Color;
    deadDucks: number; //just for faster and easier UI rendering, not used in the game logic
};