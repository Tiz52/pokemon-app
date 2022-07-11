import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/IPokemon';

export const usePokemonSearch = () => {
  const [simplePokemons, setSimplePokemons] = useState<SimplePokemon[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );
    return mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const id =
        url
          .slice(0, url.length - 1)
          .split('/')
          .pop() || '';
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, name, picture};
    });

    setSimplePokemons(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isFetching, simplePokemons};
};
