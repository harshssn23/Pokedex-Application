// HomePage.tsx
import React, { useState, useEffect } from 'react';
import { PokemonList } from '../components/PokemonList';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const ITEMS_PER_PAGE = 8;
const TOTAL_POKEMON = 1025;

const pokemonCache: Record<string, Pokemon> = {};

export const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);

        // If searchTerm is provided, handle search directly
        if (searchTerm) {
          handleSearch(searchTerm);
          return;
        }

        // Fetch paginated Pokémon list when no search term is provided
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );
        const data: PokemonListResponse = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            if (pokemonCache[pokemon.name]) {
              return pokemonCache[pokemon.name];
            } else {
              const res = await fetch(pokemon.url);
              const details = await res.json();
              pokemonCache[pokemon.name] = details;
              return details;
            }
          })
        );

        setPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, searchTerm]);

  const handleSearch = async (term: string) => {
    if (!term) {
      setCurrentPage(1);
      return;
    }

    setIsLoading(true);
    try {
      const searchKey = term.toLowerCase();
      if (pokemonCache[searchKey]) {
        setPokemons([pokemonCache[searchKey]]);
      } else {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchKey}`);
        if (response.ok) {
          const pokemon = await response.json();
          pokemonCache[searchKey] = pokemon;
          setPokemons([pokemon]);
        } else {
          setPokemons([]);
        }
      }
    } catch (error) {
      console.error('Error searching Pokémon:', error);
      setPokemons([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Pokédex</h1>
        <PokemonList
          pokemons={pokemons}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSearch={(term) => {
            setSearchTerm(term);
            setCurrentPage(1); // Reset to page 1 on new search
          }}
        />
      </div>
    </div>
  );
};
