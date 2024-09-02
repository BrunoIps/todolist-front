import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { navigationRef } from './services/navigation';
import StackNavigator from './screens/StackNavigator';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import LoadingComponent from './components/Loading';
import { getItem } from './utils/Storage';
import navigationService from '@mobile/services/navigation';

const AppContent = () => {
  useEffect(() => {
    let token;
    let id;
    (async () => {
      token = await getItem('token');
      id = await getItem('id');

      if (token && token.length > 0 && id && id.length > 0) {
        navigationService.navigate('Content');
      }
    })();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <StackNavigator />
        <LoadingComponent />
      </Provider>
    </NavigationContainer>
  );
};

export default AppContent;
