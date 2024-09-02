import variables from '@mobile/config/variables';
import { useReduxState } from '@mobile/hooks/useReduxState';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent: React.FC = () => {
  const loading = useReduxState().LoadingState();

  const isLoading =
    loading && Object.values(loading).some(value => value === true);

  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ActivityIndicator size="large" color={variables.lighterPurple} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default LoadingComponent;
