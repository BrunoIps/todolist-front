import React from 'react';
import { createBottomTab } from '@mobile/services/navigation';
import Home from './Home';
import HomeIcon from '@mobile/assets/Home.svg';
import Add from '@mobile/assets/Add.svg';
import variables from '@mobile/config/variables';
import StackNavigator from './Task/TaskStack';
import { CommonActions } from '@react-navigation/native';

const BottomTab = createBottomTab();

const ContentStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: variables.primaryColor,
        tabBarInactiveTintColor: variables.black,
      }}
      initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon
              width={size}
              height={size}
              color={focused ? variables.primaryColor : variables.black}
            />
          ),
          title: 'Inicio',
        }}
      />
      <BottomTab.Screen
        name="TaskStack"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Add
              width={size}
              height={size}
              color={focused ? variables.primaryColor : variables.black}
            />
          ),
          title: 'Adicionar Tarefa',
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'TaskStack', params: { screen: 'createTask' } },
                ],
              }),
            );
          },
        })}
      />
    </BottomTab.Navigator>
  );
};

export default ContentStack;
