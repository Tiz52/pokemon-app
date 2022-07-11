import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';

import {styles as appStyles} from '../theme/appTheme';
import {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/IPokemon';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemons} = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    let ignore = false;

    if (term.length === 0 && !ignore) {
      return setPokemonFiltered([]);
    }

    const getPokemons = () => {
      if (isNaN(Number(term)) && !ignore) {
        const filtered = simplePokemons.filter(p =>
          p.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        );
        return setPokemonFiltered(filtered);
      } else {
        const filtered = simplePokemons.find(p => p.id === term);
        return setPokemonFiltered([filtered || ({} as SimplePokemon)]);
      }
    };

    getPokemons();

    return () => {
      ignore = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  if (isFetching) {
    <Loading />;
  }

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          ...styles.searchInput,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={poke => poke.name}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        ListHeaderComponent={() => (
          <Text
            style={{
              ...appStyles.title,
              ...appStyles.globalMargin,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}>
            {term}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
  },
});
