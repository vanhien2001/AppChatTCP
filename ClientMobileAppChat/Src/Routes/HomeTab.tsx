import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../Feature/Home';
import Setting from '../Feature/Setting';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type HomeStackParamList = {
  Home: undefined;
  ConversationDetail: { conversationId: number };
};

const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Conversation') {
            iconName = 'chat';
          } else if (route.name === 'Setting') {
            iconName = 'settings';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Conversation"
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
