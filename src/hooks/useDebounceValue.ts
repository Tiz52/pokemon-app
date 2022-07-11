import {useState, useEffect} from 'react';

export const useDebounceValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    let ignore = false;
    const handler = setTimeout(() => {
      if (!ignore) {
        setDebouncedValue(input);
      }
    }, time);

    return () => {
      ignore = true;
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return debouncedValue;
};
