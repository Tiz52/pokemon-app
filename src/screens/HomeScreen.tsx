import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {styles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {loadPokemons, simplePokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeballBG}
      />

      <View style={homeStyles.listContainer}>
        <FlatList
          data={simplePokemons}
          keyExtractor={poke => poke.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={() => loadPokemons()}
          onEndReachedThreshold={0.4}
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                ...homeStyles.title,
                top: top + 20,
                marginBottom: top + 20,
              }}>
              Pokedex
            </Text>
          )}
          ListFooterComponent={
            <ActivityIndicator
              style={homeStyles.activityIndicator}
              size={20}
              color="grey"
            />
          }
        />
      </View>
    </>
  );
};

const homeStyles = StyleSheet.create({
  activityIndicator: {
    height: 100,
  },
  title: {
    paddingBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  pokemonImg: {
    width: 100,
    height: 100,
  },
});
