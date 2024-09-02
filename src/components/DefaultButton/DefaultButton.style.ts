import { StyleSheet } from 'react-native';

import variables from '../../config/variables';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: variables.primaryColor,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default styles;
