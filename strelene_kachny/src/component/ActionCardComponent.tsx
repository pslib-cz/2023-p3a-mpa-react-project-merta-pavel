import React from 'react';
import { ActionCard } from '../types';

type ActionCardProps = {
  card: ActionCard;
};

export const ActionCardComponent: React.FC<ActionCardProps> = ({ card }) => (
  <div>
    <img src={card.img} alt={card.name} />
    <p>{card.name}</p>
    <p>{card.description}</p>
  </div>
);