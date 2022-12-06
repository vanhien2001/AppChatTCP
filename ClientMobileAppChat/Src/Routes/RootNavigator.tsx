import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { useAppSelector } from '../Hook/redux';
import AuthRoutes from './AuthRoutes';
import HomeNavigator from './HomeNavigator';

const RootNavigator = () => {
  const authState = useAppSelector(state => state.auth.current);

  return (
    <>
      <NavigationContainer>
        <>{authState.isLogIn ? <HomeNavigator /> : <AuthRoutes />}</>
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
