export enum ActionType {
    TARGET = 'TARGET',
    SHOOT = 'SHOOT',
    MOVE = 'MOVE',
  }
  
  export interface ActionCard {
    id: number;
    type: ActionType;
    description: string;
  }
  