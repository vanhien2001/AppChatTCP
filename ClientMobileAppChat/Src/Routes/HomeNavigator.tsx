import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import AddChatGroup from '../Feature/AddChat/AddChatGroup';
import AddChatPrivate from '../Feature/AddChat/AddChatPrivate';
import ConversationMessage from '../Feature/Conversation/ConversationMessage';
import HomeTab from './HomeTab';

export type HomeStackParamList = {
  Home: undefined;
  ConversationDetail: { conversationId: number };
  AddChatPrivate: undefined;
  AddChatGroup: undefined;
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type HomeScreenRouteProp = RouteProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTab} />
      <Stack.Screen name="ConversationDetail" component={ConversationMessage} />
      <Stack.Screen name="AddChatPrivate" component={AddChatPrivate} />
      <Stack.Screen name="AddChatGroup" component={AddChatGroup} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
