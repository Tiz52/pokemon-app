import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style = {}}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    console.log(err);
    setIsLoading(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...(style as any),
      }}>
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
});
