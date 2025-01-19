// PokemonCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className="rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: typeColors[pokemon.types[0]?.type?.name] || '#A8A77A' }}
    >
      <div className="relative overflow-hidden group p-4">
        <img
          src={pokemon.sprites?.other?.['official-artwork']?.front_default || ''}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
      </div>
      <div className="text-center p-4">
        <p className="text-gray-200 text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
        <h2 className="text-white text-xl capitalize font-bold mb-2">{pokemon.name}</h2>
        <div className="flex gap-2 justify-center flex-wrap">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="px-3 py-1 rounded-full text-white text-sm capitalize shadow-md"
              style={{ backgroundColor: typeColors[type.name] }}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
