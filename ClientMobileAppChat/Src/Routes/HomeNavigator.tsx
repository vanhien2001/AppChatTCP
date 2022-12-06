import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import EnterAddressEndpoint from '../Feature/Auth/EnterAddressEndpoint';
import Login from '../Feature/Auth/Login';
import Register from '../Feature/Auth/Register';
import Home from '../Feature/Home';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
