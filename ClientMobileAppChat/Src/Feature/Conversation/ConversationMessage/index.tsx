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

const ConversationMessage = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const route = useRoute<HomeScreenRouteProp>();
  const messageState = useAppSelector(state => state.message.current);
  const authState = useAppSelector(state => state.auth.current);
  const [text, setText] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

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
        <Menu
          trigger={triggerProps => (
            <Pressable {...triggerProps}>
              <ThreeDotsIcon />
            </Pressable>
          )}
          placement="bottom right">
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
          <Menu.Item>Poppins</Menu.Item>
          <Menu.Item>SF Pro</Menu.Item>
        </Menu>
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
                    index !== array.length - 1 &&
                    array[index + 1].user.Id !== item.user.Id &&
                    array[index - 1].user.Id !== item.user.Id
                  ) {
                    return (
                      // stand alone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-end `}>
                        <View style={tw`bg-blue-400 py-2 px-3 rounded-full`}>
                          <Text style={tw`text-white`}>{item.Text}</Text>
                        </View>
                      </View>
                    );
                  } else if (
                    index !== 0 &&
                    array[index - 1].user.Id !== item.user.Id
                  ) {
                    return (
                      // first not standalone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-end`}>
                        <View
                          style={tw`bg-blue-400 py-2 px-3 rounded-full rounded-br-lg`}>
                          <Text style={tw`text-white text-base`}>
                            {item.Text}
                          </Text>
                        </View>
                      </View>
                    );
                  } else if (
                    index !== array.length - 1 &&
                    array[index + 1].user.Id === item.user.Id
                  ) {
                    return (
                      // not standalone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-end`}>
                        <View
                          style={tw`bg-blue-400 py-2 px-3 rounded-full rounded-br-lg rounded-tr-lg `}>
                          <Text style={tw`text-white text-base`}>
                            {item.Text}
                          </Text>
                        </View>
                      </View>
                    );
                  }

                  return (
                    // last message from host
                    <View
                      key={item.Id}
                      style={tw`w-full mb-5 pr-1 flex-row justify-end`}>
                      <View
                        style={tw`bg-blue-400 py-2 px-3 rounded-full rounded-tr-lg`}>
                        <Text style={tw`text-white text-base`}>
                          {item.Text}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  //!guest message

                  if (
                    index !== array.length - 1 &&
                    array[index + 1].user.Id !== item.user.Id &&
                    array[index - 1].user.Id !== item.user.Id
                  ) {
                    return (
                      // stand alone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-start`}>
                        <Avatar
                          size="sm"
                          style={tw`mr-2 ml-2`}
                          source={{
                            uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                          }}
                        />
                        <View style={tw`bg-gray-300 py-2 px-3 rounded-full`}>
                          <Text style={tw`text-base`}>{item.Text}</Text>
                        </View>
                      </View>
                    );
                  } else if (
                    index !== 0 &&
                    array[index - 1].user.Id !== item.user.Id
                  ) {
                    return (
                      // first not standalone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-start`}>
                        <View
                          style={tw`bg-gray-300 py-2 px-3 rounded-full rounded-bl-lg ml-12`}>
                          <Text style={tw`text-base`}>{item.Text}</Text>
                        </View>
                      </View>
                    );
                  } else if (
                    index !== array.length - 1 &&
                    array[index + 1].user.Id === item.user.Id
                  ) {
                    return (
                      // not standalone message
                      <View
                        key={item.Id}
                        style={tw`w-full pr-1 mb-[1px] flex-row justify-start`}>
                        <View
                          style={tw`bg-gray-300 py-2 px-3 rounded-full rounded-bl-lg rounded-tl-lg ml-12`}>
                          <Text style={tw`text-base`}>{item.Text}</Text>
                        </View>
                      </View>
                    );
                  }

                  return (
                    // last message from host
                    <View
                      key={item.Id}
                      style={tw`w-full mb-5 pr-1 flex-row justify-start`}>
                      <Avatar
                        size="sm"
                        style={tw`mr-2 ml-2`}
                        source={{
                          uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                        }}
                      />
                      <View
                        style={tw`bg-gray-300 py-2 px-3 rounded-full rounded-tl-lg`}>
                        <Text style={tw`text-base`}>{item.Text}</Text>
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
