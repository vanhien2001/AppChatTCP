import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import ConversationMessage from '../Feature/Conversation/ConversationMessage';
import Home from '../Feature/Home';

export type HomeStackParamList = {
  Home: undefined;
  ConversationDetail: { conversationId: number };
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type HomeScreenRouteProp = RouteProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ConversationDetail" component={ConversationMessage} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
