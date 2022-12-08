import React, { useEffect } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../Hook/redux';
import conversationTcp from '../../Tcp/Conversation';
import { HomeScreenNavigationProp } from '../../Routes/HomeNavigator';
import { View, ScrollView, Text, Avatar } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const authState = useAppSelector(state => state.auth.current);

  const conversationState = useAppSelector(state => state.conversation.current);

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
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View style={tw`p-5`}>
              {conversationState?.map(item => (
                <TouchableOpacity
                  key={item.Id}
                  onPress={() =>
                    homeNavigation.navigate('ConversationDetail', {
                      conversationId: item.Id,
                    })
                  }>
                  <View style={tw`h-20 flex-row items-center`}>
                    <Avatar size="md" style={tw`bg-gray-300`}>
                      <Icon name="groups" size={30} style={tw`text-gray-500`} />
                    </Avatar>
                    <View style={tw`ml-3`}>
                      <Text style={tw`text-lg`}>{item.Name}</Text>
                      <Text style={tw`text-gray-500`}>
                        Lorem ipsum dolor sit amet.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
