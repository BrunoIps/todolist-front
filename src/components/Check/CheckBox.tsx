import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Check from '@mobile/assets/Check.svg'; // Importe o SVG do check

interface CustomCheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  label?: string;
}

const CustomCheckbox = ({
  isChecked,
  onToggle,
  label,
}: CustomCheckboxProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Check width={20} height={20} color="green" />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: 8,
  },
  checked: {
    borderColor: '#4CAF50',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CustomCheckbox;
