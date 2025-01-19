// PokemonDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import { ArrowLeft } from 'lucide-react';

const pokemonCache: Record<string, Pokemon> = {};


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

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [similarPokemons, setSimilarPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setIsLoading(true);

        if (pokemonCache[id!]) {
          setPokemon(pokemonCache[id!]);
        } else {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data: Pokemon = await response.json();
          pokemonCache[id!] = data;
          setPokemon(data);
        }

        const pokemonTypes = pokemonCache[id!]?.types.map(t => t.type.name);
        const similarPokemonPromises = [];
        const seenPokemon = new Set([pokemonCache[id!]?.id]);

        for (const type of pokemonTypes) {
          const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
          const typeData = await typeResponse.json();

          for (const p of typeData.pokemon) {
            const pokemonId = parseInt(p.pokemon.url.split('/').slice(-2, -1)[0]);
            if (!seenPokemon.has(pokemonId)) {
              if (pokemonCache[pokemonId]) {
                similarPokemonPromises.push(pokemonCache[pokemonId]);
              } else {
                const res = await fetch(p.pokemon.url);
                const pokemonData = await res.json();
                pokemonCache[pokemonId] = pokemonData;
                similarPokemonPromises.push(pokemonData);
              }
              seenPokemon.add(pokemonId);
            }
          }
        }

        const similarPokemonData = await Promise.all(similarPokemonPromises);
        setSimilarPokemons(similarPokemonData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (isLoading || !pokemon) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center text-white mb-8 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to List
        </button>

        <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>

            <div className="text-white">
              <div className="mb-6">
                <p className="text-gray-400 text-lg">#{String(pokemon.id).padStart(3, '0')}</p>
                <h1 className="text-5xl font-bold capitalize mb-4">{pokemon.name}</h1>
                <div className="flex gap-3 flex-wrap">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className="px-6 py-2 rounded-full shadow-md capitalize text-lg font-medium"
                      style={{ backgroundColor: typeColors[type.name] || '#A8A77A' }}
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-700 rounded-xl p-6">
                <div className="text-center">
                  <p className="text-gray-300 text-lg mb-2">Height</p>
                  <p className="text-2xl font-bold bg-gray-800 rounded-lg py-3">{pokemon.height / 10}m</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-lg mb-2">Weight</p>
                  <p className="text-2xl font-bold bg-gray-800 rounded-lg py-3">{pokemon.weight / 10}kg</p>
                </div>
              </div>

              <div className="bg-gray-700 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Base Stats</h2>
                <div className="space-y-5">
                  {pokemon.stats.map(({ base_stat, stat }) => (
                    <div key={stat.name}>
                      <div className="flex justify-between mb-2">
                        <span className="capitalize text-lg">{stat.name.replace('-', ' ')}</span>
                        <span className="font-bold text-lg">{base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500 relative"
                          style={{ width: `${(base_stat / 255) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {similarPokemons.length > 0 && (
          <div className="mt-12 bg-gray-800 rounded-lg p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8">Similar Pokémon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {similarPokemons.map((pokemon) => (
                <div
                  key={pokemon.id}
                  onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                  className="bg-gray-700 rounded-xl p-4 cursor-pointer hover:bg-gray-600 transition-all transform hover:-translate-y-2 hover:shadow-2xl group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
                    <img
                      src={pokemon.sprites.other['official-artwork'].front_default}
                      alt={pokemon.name}
                      className="w-full h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
                    <h3 className="text-white text-xl font-bold capitalize mb-2">{pokemon.name}</h3>
                    <div className="flex gap-2 justify-center">
                      {pokemon.types.map(({ type }) => (
                        <span
                          key={type.name}
                          className="px-3 py-1 rounded-full text-white text-sm capitalize shadow-md"
                          style={{ backgroundColor: typeColors[type.name] || '#A8A77A' }}
                        >
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
