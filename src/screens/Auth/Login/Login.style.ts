import variables from '@mobile/config/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: variables.paddingHorizontal,
  },
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 30,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  containerWithMarginTop: {
    marginTop: 10,
  },
  errorContainer: {
    width: '100%',
  },
  errorText: {
    color: variables.dangerColor,
  },
});

export default styles;
