import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import AddChatGroup from '../Feature/AddChat/AddChatGroup';
import AddChatPrivate from '../Feature/AddChat/AddChatPrivate';
import ConversationMessage from '../Feature/Conversation/ConversationMessage';
import ConversationSetting from '../Feature/Conversation/ConversationSetting';
import UpdateUser from '../Feature/Setting/UpdateUser';
import IUser from '../Interface/User';
import HomeTab from './HomeTab';

export type HomeStackParamList = {
  Home: undefined;
  ConversationDetail: { conversationId: number; avatar: string; name: string };
  AddChatPrivate: undefined;
  AddChatGroup: undefined;
  UpdateUser: undefined;
  ConversationSetting: {
    groupName?: string;
    createdBy?: string;
    dataCreated?: string;
    conversationId?: number;
    user?: {
      Id: number;
      ConversationId: number;
      userEmail: null;
      user: IUser;
      date: string;
    }[];
  };
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
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen
        name="ConversationSetting"
        component={ConversationSetting}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
