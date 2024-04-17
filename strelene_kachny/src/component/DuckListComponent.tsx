import React from 'react';
import { duckCard } from '../types';
import { DuckComponent } from './DuckComponent';

type DuckListProps = {
  ducks: duckCard[];
};

export const DuckListComponent: React.FC<DuckListProps> = ({ ducks }) => (
  <div>
    {ducks.map((duck) => (
      <DuckComponent key={duck.id} duck={duck} />
    ))}
  </div>
);