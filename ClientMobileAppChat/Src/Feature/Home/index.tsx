import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Section from '../../Components/Section';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';
import { useAppDispatch } from '../../Hook/redux';
import { logOut } from '../../Context/slices/authSlice';
import { AuthScreenNavigationProp } from '../../Routes/AuthRoutes';

const Home = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogout = async (e: GestureResponderEvent) => {
    await dispatch(logOut());
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <View style={tw`text-black`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Login page">
              <Button title="Logout" onPress={handleLogout} />
            </Section>

            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
