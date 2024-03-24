import { Weapon } from "./Weapon";
import { ActionCard } from "./ActionCards";

export interface Player {
    id: number;
    name: string;
    weapons: typeof Weapon[];
    cards: ActionCard[];
}
  