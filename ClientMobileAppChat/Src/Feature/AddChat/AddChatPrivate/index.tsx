import { Text, View } from 'native-base';
import React, { useState } from 'react';
import AddChatPrivateLayout from './Components/AddChatPrivateLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../Hook/redux';
import { HomeScreenNavigationProp } from '../../../Routes/HomeNavigator';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import conversationTcp from '../../../Tcp/Conversation';

export type AddChatPrivateForm = {
  email: string;
};

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const AddChatPrivate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddChatPrivateForm>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const authState = useAppSelector(state => state.auth.current);

  const onSubmit = async (data: AddChatPrivateForm) => {
    setIsLoading(true);
    if (authState.Id) {
      await conversationTcp.createConversationPrivate({
        user1: { Id: authState.Id },
        user2: { PhoneNumber: data.email, Email: data.email },
      });
    }
    await homeNavigation.navigate('Home');
    setIsLoading(false);
  };

  return (
    <AddChatPrivateLayout
      isLoading={isLoading}
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AddChatPrivate;
