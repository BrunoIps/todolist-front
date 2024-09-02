import { createStack } from '@mobile/services/navigation';
import React from 'react';
import Home from '../Home';
import CreateTask from './CreateTask/CreateTask';
import EditTask from './Edit/Edit';

const StackNavigation = createStack();
const StackNavigator = () => {
  return (
    <StackNavigation.Navigator
      initialRouteName="createTask"
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigation.Screen name="createTask" component={CreateTask} />
      <StackNavigation.Screen name="EditTask" component={EditTask} />
    </StackNavigation.Navigator>
  );
};

export default StackNavigator;
