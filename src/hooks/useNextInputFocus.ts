import { useRef } from 'react';
import { TextInput } from 'react-native';

export const useNextInputFocus = () => {
  const inputRefs = useRef<TextInput[]>([]);

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const setInputRef = (index: number) => (ref: TextInput) => {
    inputRefs.current[index] = ref;
  };

  return { setInputRef, focusNextInput };
};
