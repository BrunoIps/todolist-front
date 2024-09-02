import { createStack } from '@mobile/services/navigation';
import React from 'react';
import AuthStack from './Auth/AuthStack';
import ContentStack from './Content/ContentStack';

const StackNavigation = createStack();
const StackNavigator = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigation.Screen name="Auth" component={AuthStack} />
      <StackNavigation.Screen name="Content" component={ContentStack} />
    </StackNavigation.Navigator>
  );
};

export default StackNavigator;
