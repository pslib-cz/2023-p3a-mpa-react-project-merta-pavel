import React from 'react';

interface WeaponProps {
  id: number;
  name: string;
  image: string;
}

export const Weapon: React.FC<WeaponProps> = ({ id, name, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Weapon;
