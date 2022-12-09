import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Avatar,
  Input,
  KeyboardAvoidingView,
  Menu,
  Pressable,
  Text,
  ThreeDotsIcon,
  View,
} from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../Hook/redux';
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from '../../../Routes/HomeNavigator';
import conversationTcp from '../../../Tcp/Conversation';
import tw from 'twrnc';
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputSubmitEditingEventData,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const ConversationMessage = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const route = useRoute<HomeScreenRouteProp>();
  const messageState = useAppSelector(state => state.message.current);
  const authState = useAppSelector(state => state.auth.current);
  const [text, setText] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const userActiveState = useAppSelector(state => state.userActive.current);

  useEffect(() => {
    const fetchConversation = async () => {
      const conversationId = route.params?.conversationId;
      if (conversationId) {
        await conversationTcp.getConversationById(conversationId);
      }
    };
    fetchConversation();
  }, []);

  useEffect(() => {
    homeNavigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            homeNavigation.navigate('ConversationSetting', {
              groupName: messageState?.Name,
              createdBy: messageState?.user.Name,
              dataCreated: messageState?.dateCreate,
              user: messageState?.groupMembers,
              conversationId: route.params?.conversationId,
            })
          }>
          <ThreeDotsIcon />
        </Pressable>
      ),
      headerTitle: () => (
        <View style={tw`flex-row items-center`}>
          {route.params?.avatar === 'group' ? (
            <Avatar size={35} style={tw`bg-gray-300`}>
              <Icon name="groups" size={25} style={tw`text-gray-500`} />
            </Avatar>
          ) : (
            <Avatar
              size={35}
              source={{
                uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${route.params?.avatar}`,
              }}>
              {userActiveState.includes(item.user.Id) ? (
                <Avatar.Badge bg="green.500" />
              ) : null}
            </Avatar>
          )}
          <Text style={tw`ml-2 text-lg`}>{route.params?.name}</Text>
        </View>
      ),
    });
  }, [homeNavigation]);

  const onSubmit = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const conversationId = route.params?.conversationId;
    if (text !== '' && conversationId && authState.Id) {
      console.log(text);
      await conversationTcp.sendMessage({
        ConversationId: conversationId,
        user: { Id: authState.Id },
        Text: text,
      });
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1`}>
      <View style={tw`w-full h-full flex-col`}>
        <View style={tw`flex-auto`}>
          <ScrollView
            ref={ref => (scrollViewRef.current = ref)}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              scrollViewRef.current?.scrollToEnd({ animated: false })
            }
            style={tw`h-full`}>
            <View>
              {messageState?.messages.map((item, index, array) => {
                if (authState.Id === item.user.Id) {
                  if (
                    index !== 0 &&
                    index !== array.length - 1 &&
                    index <= array.length - 1
                  ) {
                    if (array[index + 1].user.Id === item.user.Id) {
                      return (
                        <View
                          key={item.Id}
                          style={tw`w-full pr-1 mb-1px flex-row justify-end `}>
                          <View
                            style={tw`bg-blue-400 py-2 px-3 rounded-full flex-row items-baseline`}>
                            <Text style={tw`text-white text-[10px] mr-1`}>
                              {moment().format('hh:mm')}
                            </Text>
                            <Text style={tw`text-base text-white`}>
                              {item.Text}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  }

                  return (
                    <View
                      key={item.Id}
                      style={tw`w-full pr-1 mb-4 flex-row justify-end `}>
                      <View
                        style={tw`bg-blue-400 py-2 px-3 rounded-full flex-row items-baseline`}>
                        <Text style={tw`text-white text-[10px] mr-1`}>
                          {moment().format('hh:mm')}
                        </Text>
                        <Text style={tw`text-base text-white`}>
                          {item.Text}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  //!guest message
                  if (
                    index !== 0 &&
                    index !== array.length - 1 &&
                    index <= array.length - 1
                  ) {
                    if (array[index + 1].user.Id === item.user.Id) {
                      return (
                        <View
                          key={item.Id}
                          style={tw`w-full pl-12 mb-[1px] flex-row justify-start`}>
                          <View
                            style={tw`bg-gray-300 py-2 px-3 rounded-full flex-row items-baseline`}>
                            <Text style={tw`text-base mr-1`}>{item.Text}</Text>
                            <Text style={tw`text-[10px]`}>
                              {moment().format('hh:mm')}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  }
                  return (
                    <View
                      key={item.Id}
                      style={tw`w-full pr-1 mb-4 flex-row justify-start `}>
                      <Avatar
                        size="sm"
                        style={tw`mr-2 ml-2`}
                        source={{
                          uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                        }}>
                        {userActiveState.includes(item.user.Id) ? (
                          <Avatar.Badge bg="green.500" />
                        ) : null}
                      </Avatar>
                      <View
                        style={tw`bg-gray-300 py-2 px-3 rounded-full flex-row items-baseline`}>
                        <Text style={tw`text-base mr-1`}>{item.Text}</Text>
                        <Text style={tw`text-[10px]`}>
                          {moment().format('hh:mm')}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          </ScrollView>
        </View>
        <View style={tw`flex-none`}>
          <Input
            onSubmitEditing={onSubmit}
            returnKeyType="send"
            size="lg"
            placeholder="Message"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConversationMessage;
