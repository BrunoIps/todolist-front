import { StyleSheet } from 'react-native';

import variables from '../../config/variables';

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: variables.black,
    borderColor: variables.black,
  },
  iconContainer: {
    position: 'absolute',
    marginLeft: 20,
    marginRight: 10,
  },
});

export default styles;
