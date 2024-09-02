import variables from '@mobile/config/variables';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContainer: {
    marginBottom: 10,
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    height: '80%',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: variables.dangerColor,
  },
});

export default styles;
