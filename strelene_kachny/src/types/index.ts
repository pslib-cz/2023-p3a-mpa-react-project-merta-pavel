export type GameState = {
    players: Player[],
    currentPlayer: number,
    deck: Card[],
    target: number[],
    discardPile: Card[],
    turn: number,
    winner: number,
    gameover: boolean,
    winnerMessage: string,
    goal: number,
}

export type Card = {
    name: string,
    description: string,
    type: string,
    value: number,
    img: string,
    position: number,
}

export type Player = {
    deck: ActionCard[],
    kachna: Card[],
    hand: Card[],
}

export enum Action {
    ZAMERIT = "ZAMERIT",
    VYSTRELIT = "VYSTRELIT",
    DVOUTA_TREFA = "DVOUTA_TREFA",
    DVOUTA_HROZBA = "DVOUTA_HROZBA",
    JEJDA_VEDELE = "JEJDA_VEDELE",
    STRELEJ_VPRAVO = "STRELEJ_VPRAVO",
    STRELEJ_VLEVO = "STRELEJ_VLEVO",
    DVOJITA_HROZBA = "DVOJITA_HROZBA",
    DIVOKEJ_BILL = "DIVOKEJ_BILL",
    KACHNI_TANEC = "KACHNI_TANEC",
    KACHNI_POCHOD = "KACHNI_POCHOD",
    LEHARO = "LEHARO",
    POHYB = "POHYB",
    ROSAMBO = "ROSAMBO",
    TURBOKACHNA = "TURBOKACHNA",
    VYBER_CILE = "VYBER_CILE",
    VYBER_KARTY = "VYBER_KARTY",
    PLAY_CARD = "PLAY_CARD",
}

export type ActionCard = Card & {
    action: Action, 
}

export interface ActionType<T = any> {
    type: string;
    payload?: T;
  }
  
  export interface ActionPayload {
    playerIndex?: number;
    cardIndex?: number;
    actionCard?: ActionCard;
  }