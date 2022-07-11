import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="grey" />
      <Text>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
