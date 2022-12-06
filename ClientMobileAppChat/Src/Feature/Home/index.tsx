import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
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

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import Section from '../../Components/Section';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { GestureResponderEvent } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../Hook/redux';
import { logOut } from '../../Context/slices/authSlice';
import { AuthScreenNavigationProp } from '../../Routes/AuthRoutes';
import conversationTcp from '../../Tcp/Conversation';

const Home = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth.current);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogout = async (e: GestureResponderEvent) => {
    await dispatch(logOut());
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchConversation = async () => {
      if (authState.Id) {
        await conversationTcp.getConversationByUserId(authState.Id, resData => {
          console.log(resData);
        });
      }
    };
    fetchConversation();
  }, []);

  return (
    <SafeAreaView>
      <View style={tw`text-black`}>
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
