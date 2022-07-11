import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {SimplePokemon} from '../interfaces/IPokemon';
import {FadeInImage} from './FadeInImage';
import {useEffect} from 'react';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

type PokemonParams = {
  Pokemon: {pokemon: SimplePokemon; color: string};
};

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');

  const navigation = useNavigation<StackNavigationProp<PokemonParams>>();

  useEffect(() => {
    let ignore = false;

    const getColors = async () => {
      const colors = await ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
      });
      if (colors.platform === 'ios' && !ignore) {
        return setBgColor(colors.background);
      }
      if (colors.platform === 'android' && !ignore) {
        return setBgColor(colors.dominant || 'grey');
      }
    };

    getColors();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        backgroundColor: bgColor,
      }}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Pokemon', {pokemon, color: bgColor})}>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeballImg}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImg} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    height: 120,
    width: windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardContainer: {
    height: 120,
    width: windowWidth * 0.4,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeballImg: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -24,
    right: -24,
    opacity: 0.5,
  },
  pokemonImg: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokeballContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    overflow: 'hidden',
    bottom: 0,
    right: 0,
  },
});
