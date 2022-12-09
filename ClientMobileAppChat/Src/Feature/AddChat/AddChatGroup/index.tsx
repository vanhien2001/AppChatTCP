import React, { useState } from 'react';
import AddChatGroupLayout from './Components/AddChatGroupLayout';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../Hook/redux';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../../Routes/HomeNavigator';
import conversationTcp from '../../../Tcp/Conversation';

export type AddChatGroupForm = {
  nameConversation: string;
};

const schema = yup
  .object({
    nameConversation: yup.string().required(),
  })
  .required();

const AddChatGroup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddChatGroupForm>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const authState = useAppSelector(state => state.auth.current);

  const onSubmit = async (data: AddChatGroupForm) => {
    setIsLoading(true);
    if (authState.Id) {
      await conversationTcp.createConversation({
        Name: data.nameConversation,
        user: { Id: authState.Id },
      });
    }
    await homeNavigation.navigate('Home');
    setIsLoading(false);
  };

  return (
    <AddChatGroupLayout
      isLoading={isLoading}
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default AddChatGroup;
