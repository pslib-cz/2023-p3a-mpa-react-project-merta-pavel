export type GameState = {
    players: Player[],
    currentPlayer: number,
    deck: Card[],
    discardPile: Card[],
    turn: number,
    winner: number,
    gameover: boolean,
    winnerMessage: string,
}

export type Card = {
    name: string,
    description: string,
    type: string,
    value: number,
    img: string,
}

export type Player = {
    deck: ActionCard[],
    kachna: Card[],
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
}

export type ActionCard = Card & {
    action: Action, 
}
