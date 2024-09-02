import React from 'react';
import styles from './Input.styles';
import { TextInput, View, TextInputProps } from 'react-native';
import variables from '@mobile/config/variables';

interface InputProps extends TextInputProps {
  StartIcon?: React.ReactElement;
  EndIcon?: any;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      EndIcon,
      StartIcon,
      maxLength = 127,
      onChangeText,
      placeholder,
      secureTextEntry,
      value,
      ...restProps
    },
    ref,
  ) => {
    return (
      <View style={styles.row}>
        <View style={styles.container}>
          {!!StartIcon && StartIcon}
          <TextInput
            ref={ref}
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            placeholderTextColor={variables.gray}
            {...restProps}
          />
          {!!EndIcon && EndIcon}
        </View>
      </View>
    );
  },
);

export default Input;
