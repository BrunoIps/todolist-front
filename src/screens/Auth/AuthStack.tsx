import { createStack } from '@mobile/services/navigation';
import React from 'react';
import Login from './Login';
import CreateAccount from './CreateAccount/CreateAccount';

const Stack = createStack();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default AuthStack;
