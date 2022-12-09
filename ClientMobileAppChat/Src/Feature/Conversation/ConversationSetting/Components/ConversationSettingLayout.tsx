import React, { FC, useState } from 'react';
import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  Text,
  View,
} from 'native-base';
import tw from 'twrnc';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import { ConversationSettingForm } from '..';
import { useRoute } from '@react-navigation/native';
import { HomeScreenRouteProp } from '../../../../Routes/HomeNavigator';
import moment from 'moment';
import { useAppSelector } from '../../../../Hook/redux';
import conversationTcp from '../../../../Tcp/Conversation';

interface IConversationSettingLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<ConversationSettingForm>>;
  control: Control<ConversationSettingForm, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

const ConversationSettingLayout: FC<IConversationSettingLayout> = props => {
  const { error, errors, control, handleSubmit, isLoading } = props;
  const homeRoute = useRoute<HomeScreenRouteProp>();
  const userActiveState = useAppSelector(state => state.userActive.current);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number>();
  const [deleted, setDeleted] = useState<number[]>([]);
  const authState = useAppSelector(state => state.auth.current);

  const onClose = () => {
    setIsOpen(false);
  };

  const cancelRef = React.useRef(null);

  const handleKick = async () => {
    if (deleteUserId) {
      await conversationTcp.deleteMember(deleteUserId);
      setDeleted(pre => [...pre, deleteUserId]);
    }
    onClose();
  };

  return (
    <View style={tw`m-10`}>
      <Box>
        <Text style={tw`text-lg font-medium w-40`}>Member:</Text>
        {homeRoute.params?.user
          // ?.filter(item => deleted.includes(item.user.Id))
          ?.map(item => (
            <View
              key={item.Id}
              style={tw`flex-row justify-between items-center mb-3`}>
              <Box style={tw`flex-row items-center`}>
                <Avatar
                  source={{
                    uri: `https://ui-avatars.com/api/?background=random&color=fff&name=${item.user.Name}`,
                  }}>
                  {userActiveState.includes(item.user.Id) ? (
                    <Avatar.Badge bg="green.500" />
                  ) : null}
                </Avatar>
                <Text style={tw`ml-3 text-base`}>{item.user.Name}</Text>
              </Box>
              {item.user.Id === authState.Id ? (
                <Button
                  onPress={() => {
                    setDeleteUserId(item.user.Id);
                    setIsOpen(!isOpen);
                  }}>
                  Kick
                </Button>
              ) : null}
            </View>
          ))}
      </Box>
      <Box>
        <Box style={tw`mb-5 flex-row`}>
          <Text style={tw`text-lg font-medium w-40`}>Conversation Name:</Text>
          <Text style={tw`text-lg `}>{homeRoute.params?.groupName}</Text>
        </Box>
        <Box style={tw`mb-5  flex-row`}>
          <Text style={tw`text-lg font-medium w-40`}>Created By:</Text>
          <Text style={tw`text-lg`}>{homeRoute.params?.createdBy}</Text>
        </Box>
        <Box style={tw`mb-5 flex-row`}>
          <Text style={tw`text-lg font-medium w-40`}>Date Created:</Text>
          <Text style={tw`text-lg `}>
            {moment(homeRoute.params?.dataCreated).format(
              'MMMM Do YYYY, h:mm:ss a',
            )}
          </Text>
        </Box>
      </Box>
      <Box style={tw`mb-5`}>
        <FormControl
          isDisabled={isLoading}
          isInvalid={errors.email?.message !== '' ? true : false}>
          <FormControl.Label>Email / phone</FormControl.Label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="l"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />
          {errors.email && (
            <Text style={tw`text-red-500`}>{errors.email.message}</Text>
          )}
        </FormControl>
      </Box>
      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Add Member
        </Button>
      </Box>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Member</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove member, This action can not be undo.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={handleKick}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
};

export default ConversationSettingLayout;
