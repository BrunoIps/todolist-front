import variables from '@mobile/config/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    height: '100%',
  },
  content: {
    paddingHorizontal: variables.paddingHorizontal - 10,
  },
  column: {
    width: '100%',
    height: 48,
    marginBottom: 21,
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: variables.paddingHorizontal - 10,
  },
  error: {
    color: variables.dangerColor,
  },
});

export default styles;
