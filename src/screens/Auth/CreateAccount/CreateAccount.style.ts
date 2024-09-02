import variables from '@mobile/config/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: variables.paddingHorizontal,
    height: '100%',
  },
  column: {
    width: '100%',
    height: 48,
    marginBottom: 21,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    paddingHorizontal: variables.paddingHorizontal,
    width: '100%',
    position: 'absolute',
    bottom: 70,
  },
  errorText: {
    color: variables.dangerColor,
    marginBottom: 5,
  },
});

export default styles;
