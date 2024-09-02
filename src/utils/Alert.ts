import Snackbar from 'react-native-snackbar';

export const show = (message: string, duration = Snackbar.LENGTH_LONG) => {
  Snackbar.show({
    text: message,
    duration,
  });
};
