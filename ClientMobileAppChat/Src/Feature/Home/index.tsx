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
  const userActiveState = useAppSelector(state => state.userActive.current);

  const conversationState = useAppSelector(state => state.conversation.current);

  useEffect(() => {
    const fetchConversation = async () => {
      if (authState.Id) {
        await conversationTcp.getConversationByUserId(authState.Id);
      }
    };
    fetchConversation();
    console.log(userActiveState);
  }, []);

  return (
    <SafeAreaView>
      <View style={tw`text-black h-full`}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <View style={tw`p-5`}>
              {conversationState?.map(item =>
                item.Group ? (
                  <TouchableOpacity
                    key={item.Id}
                    onPress={() =>
                      homeNavigation.navigate('ConversationDetail', {
                        conversationId: item.Id,
                        avatar: `group`,
                        name: item.Name,
                      })
                    }>
                    <View style={tw`h-20 flex-row items-center`}>
                      <Avatar size="md" style={tw`bg-gray-300`}>
                        <Icon
                          name="groups"
                          size={30}
                          style={tw`text-gray-500`}
                        />
                      </Avatar>

                      <View style={tw`ml-3`}>
                        <Text style={tw`text-lg`}>{item.Name}</Text>
                        <Text style={tw`text-gray-500`}>
                          {item.messages.length !== 0
                            ? item.messages[item.messages.length - 1].Text
                            : null}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={item.Id}
                    onPress={() =>
                      homeNavigation.navigate('ConversationDetail', {
                        conversationId: item.Id,
                        avatar: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                        name: item.user.Name,
                      })
                    }>
                    <View style={tw`h-20 flex-row items-center`}>
                      <Avatar
                        source={{
                          uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                        }}>
                        {userActiveState.includes(item.user.Id) ? (
                          <Avatar.Badge bg="green.500" />
                        ) : null}
                      </Avatar>

                      <View style={tw`ml-3`}>
                        <Text style={tw`text-lg`}>{item.user.Name}</Text>
                        <Text style={tw`text-gray-500`}>
                          {item.messages.length !== 0
                            ? item.messages[item.messages.length - 1].Text
                            : null}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
