import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/Tab1';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'Pokemon'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {top} = useSafeAreaInsets();

  const {pokemon: simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {pokemon, isLoading} = usePokemon(id);

  return (
    <View style={styles.container}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 40}}>
          {name + '\n'}#{id}
        </Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.pokemonImg} />
      </View>
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 10,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImg: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -10,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
