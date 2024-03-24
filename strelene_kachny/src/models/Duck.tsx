import React from 'react';

interface DuckProps {
  id: number;
  name: string;
  image: string;
  points: number;
}

export const Duck: React.FC<DuckProps> = ({ id, name, image, points }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <p>{name}</p>
      <p>Points: {points}</p>
    </div>
  );
}

export default Duck;
