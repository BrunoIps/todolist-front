import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './DefaultButton.style';

interface DefaultButtonProps {
  onPress: () => void;
  buttonText: string;
  color?: string;
  textColor?: string;
  fontSize?: number;
  lineHeight?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

const DefaultButton = ({
  onPress,
  buttonText,
  color,
  textColor,
  fontSize,
  lineHeight,
  backgroundColor,
  disabled,
}: DefaultButtonProps) => {
  const textStyle = {
    color: textColor ?? '#fff',
    fontSize: fontSize ?? 16,
    lineHeight: lineHeight ? Number(lineHeight) : 20,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        backgroundColor && { backgroundColor: backgroundColor },
      ]}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default DefaultButton;
