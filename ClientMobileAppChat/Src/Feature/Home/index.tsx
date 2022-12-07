import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
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
import { HomeScreenNavigationProp } from '../../Routes/HomeNavigator';
import { AddIcon, Fab, Icon } from 'native-base';

const Home = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth.current);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const conversationState = useAppSelector(state => state.conversation.current);

  const handleLogout = async (e: GestureResponderEvent) => {
    await dispatch(logOut());
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchConversation = async () => {
      if (authState.Id) {
        console.log('getConversationByUserId');
        await conversationTcp.getConversationByUserId(authState.Id);
      }
    };
    fetchConversation();
  }, []);

  return (
    <SafeAreaView>
      <View style={tw`text-black h-full`}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Login page">
              <Button title="Logout" onPress={handleLogout} />
            </Section>

            <View>
              {conversationState?.map(item => (
                <TouchableOpacity
                  key={item.Id}
                  onPress={() =>
                    homeNavigation.navigate('ConversationDetail', {
                      conversationId: item.Id,
                    })
                  }>
                  <View style={tw`h-20 flex justify-center`}>
                    <Text>{item.Name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <Fab
          renderInPortal={false}
          shadow={2}
          bottom={50}
          style={tw`right-[7%] bottom-[5%]`}
          size="lg"
          icon={<Icon as={AddIcon} color="white" name="plus" size="4" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
