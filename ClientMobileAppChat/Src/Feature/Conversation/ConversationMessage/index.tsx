import { useRoute } from '@react-navigation/native';
import { Input, Text, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../Hook/redux';
import { HomeScreenRouteProp } from '../../../Routes/HomeNavigator';
import conversationTcp from '../../../Tcp/Conversation';
import tw from 'twrnc';
import {
  Animated,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  TextInputSubmitEditingEventData,
} from 'react-native';

const ConversationMessage = () => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const route = useRoute<HomeScreenRouteProp>();
  const messageState = useAppSelector(state => state.message.current);
  const authState = useAppSelector(state => state.auth.current);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchConversation = async () => {
      const conversationId = route.params?.conversationId;
      if (conversationId) {
        await conversationTcp.getConversationById(conversationId);
      }
    };
    fetchConversation();
  }, []);

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
    <View style={tw`w-full h-full flex-col`}>
      <View style={tw`flex-auto`}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef?.current?.scrollToEnd({ animated: true })
          }>
          <View>
            {messageState?.messages.map((item, index) => {
              if (authState.Id === item.user.Id) {
                return (
                  <View
                    key={item.Id}
                    style={tw`w-full mb-5 pr-1 flex-row justify-end`}>
                    <View style={tw`bg-blue-400 py-2 px-3 rounded-full`}>
                      <Text style={tw`text-white text-base`}>{item.Text}</Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View
                    key={item.Id}
                    style={tw`w-full ${`mb-5`} pr-1 flex-row justify-start`}>
                    <View style={tw`bg-gray-300 py-2 px-3 rounded-full`}>
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
  );
};

export default ConversationMessage;
