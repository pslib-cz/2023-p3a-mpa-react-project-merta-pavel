import React from 'react';
import { ActionCard } from '../types';
import { ActionCardComponent } from './ActionCardComponent';

type ActionCardListProps = {
  cards: ActionCard[];
};

export const ActionCardListComponent: React.FC<ActionCardListProps> = ({ cards }) => (
  <div>
    {cards.map((card) => (
      <ActionCardComponent key={card.id} card={card} />
    ))}
  </div>
);