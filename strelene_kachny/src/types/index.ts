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
    row: Card[],
}

export type Card = {
    id: number,
    name: string,
    description: string,
    type: string,
    img: string,
    position: number,
    color?: string,
    isHidden?: boolean,
}

export type duckCard = {
    id: number,
    color: string,
    isDead: boolean,
    isHidden?: boolean,
    img: string,
}

export type Player = {
    deck: ActionCard[],
    kachna: duckCard[],
    id: number;
}

/*export enum ActionCardsActions{
    ZAMERIT = "ZAMERIT",
    VYSTRELIT = "VYSTRELIT",
    DVOUTA_TREFA = "DVOUTA_TREFA",
    JEJDA_VEDELE = "JEJDA_VEDELE",
    STRELEJ_VPRAVO = "STRELEJ_VPRAVO",
    STRELEJ_VLEVO = "STRELEJ_VLEVO",
    DVOJITA_HROZBA = "DVOJITA_HROZBA",
    DIVOKEJ_BILL = "DIVOKEJ_BILL",
}

export enum ActionCardsMovement{
    KACHNI_POCHOD = "KACHNI_POCHOD",
    LEHARO = "LEHARO",
    CHVATAM = "CHVATAM",
    ROSAMBO = "ROSAMBO",
    TURBOKACHNA = "TURBOKACHNA",
    KACHNI_TANEC = "KACHNI_TANEC",
    ZIVY_STIT = "ZIVY_STIT",
    KACHNI_UNIK = "KACHNI_UNIK",
}*/

export type ActionCardsActions = {
    targetIndex: number,
    card: Card,
};

export type ActionCardsMovement = {
    card: Card,
};

export type ActionCardsDefense = {
    targetIndex: number,
    card: Card,
}

export enum actionType{
    DEFAULT,
    DRAW_CARD,
    ZAMERIT,
    VYSTRELIT,
    DVOUTA_TREFA,
    JEJDA_VEDELE,
    STRELEJ_VPRAVO,
    STRELEJ_VLEVO,
    DVOJITA_HROZBA,
    DIVOKEJ_BILL,
    KACHNI_POCHOD,
    LEHARO,
    CHVATAM,
    ROSAMBO,
    TURBOKACHNA,
    KACHNI_TANEC,
    ZIVY_STIT,
    KACHNI_UNIK,
}

export type ActionCard = Card & {
    action: Action, 
};

export type Action = 
    { type: actionType.ZAMERIT; payload: ActionCardsActions } | 
    { type: actionType.VYSTRELIT; payload: ActionCardsActions } |
    { type: actionType.DVOUTA_TREFA; payload: ActionCardsActions } |
    { type: actionType.JEJDA_VEDELE; payload: ActionCardsActions } |
    { type: actionType.STRELEJ_VPRAVO; payload: ActionCardsActions } |
    { type: actionType.STRELEJ_VLEVO; payload: ActionCardsActions } |
    { type: actionType.DVOJITA_HROZBA; payload: ActionCardsActions } |
    { type: actionType.DIVOKEJ_BILL; payload: ActionCardsActions } |
    { type: actionType.KACHNI_POCHOD; payload: ActionCardsMovement } |
    { type: actionType.LEHARO; payload: ActionCardsMovement } |
    { type: actionType.CHVATAM; payload: ActionCardsMovement } |
    { type: actionType.ROSAMBO; payload: ActionCardsMovement } |
    { type: actionType.TURBOKACHNA; payload: ActionCardsMovement } |
    { type: actionType.KACHNI_TANEC; payload: ActionCardsMovement } |
    { type: actionType.ZIVY_STIT; payload: ActionCardsDefense} |
    { type: actionType.KACHNI_UNIK; payload: ActionCardsDefense };