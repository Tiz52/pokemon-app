import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {SimplePokemon} from '../interfaces/IPokemon';

export type RootStackParams = {
  Home: undefined;
  Pokemon: {pokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const Tab1 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
