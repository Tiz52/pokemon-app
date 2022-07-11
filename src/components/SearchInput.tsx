import React, {useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebounceValue} from '../hooks/useDebounceValue';
import {useEffect} from 'react';

interface Props {
  onDebounce?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebounceValue(textValue, 500);

  useEffect(() => {
    let ignore = false;
    if (onDebounce && !ignore) {
      onDebounce(debouncedValue);
    }
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Buscar Pokémon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />

        <Icon name="search-outline" size={30} color="grey" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});
