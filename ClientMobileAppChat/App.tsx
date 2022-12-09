/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import RootNavigator from './Src/Routes/RootNavigator';
import { persistor, store } from './Src/Context/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView } from 'react-native';
import tw from 'twrnc';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <SafeAreaView style={tw`flex-1`}>
            <RootNavigator />
            <Toast />
          </SafeAreaView>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
