import React from 'react';
import { duckCard } from '../types';

type DuckProps = {
  duck: duckCard;
};

export const DuckComponent: React.FC<DuckProps> = ({ duck }) => (
  <div>
    <img src={duck.img} alt={duck.color} />
    <p>{duck.color}</p>
  </div>
);