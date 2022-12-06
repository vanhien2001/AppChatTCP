import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import EnterAddressEndpoint from '../Feature/Auth/EnterAddressEndpoint';
import Login from '../Feature/Auth/Login';
import Register from '../Feature/Auth/Register';

export type AuthStackParamList = {
  Login: undefined;
  Address: undefined;
  Register: undefined;
};

export type AuthScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Address" component={EnterAddressEndpoint} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
