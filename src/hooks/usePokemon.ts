import {useCallback, useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {FullPokemon} from '../interfaces/IPokemon';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<FullPokemon>({} as FullPokemon);

  const loadPokemon = useCallback(async () => {
    const resp = await pokemonApi.get<FullPokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return {isLoading, pokemon};
};
