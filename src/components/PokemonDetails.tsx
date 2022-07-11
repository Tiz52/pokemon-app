import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FullPokemon} from '../interfaces/IPokemon';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: FullPokemon;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={{...styles.container, ...styles.firtMargin}}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, ...styles.marginText}}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} lb</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_default}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_default}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_default}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_default}
        />
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Habilidades</Text>
        <View style={styles.typesContainer}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, ...styles.marginText}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={styles.typesContainer}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, ...styles.marginText}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, index) => (
            <View style={styles.statsContainer} key={stat.stat.name + index}>
              <Text
                style={[
                  styles.regularText,
                  styles.marginText,
                  styles.statText,
                ]}>
                {stat.stat.name}
              </Text>

              <Text
                style={[
                  styles.regularText,
                  styles.marginText,
                  styles.fontWeightBold,
                ]}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.bottonDetails}>
          <FadeInImage
            style={styles.basicSprite}
            uri={pokemon.sprites.front_default}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  regularText: {
    fontSize: 19,
    color: 'black',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  marginText: {
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  firtMargin: {
    marginTop: 370,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statText: {
    marginRight: 10,
    width: 150,
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  bottonDetails: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
