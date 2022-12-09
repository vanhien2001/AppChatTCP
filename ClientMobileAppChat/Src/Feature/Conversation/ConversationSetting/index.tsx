import React, { useState } from 'react';
import ConversationSettingLayout from './Components/ConversationSettingLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from '../../../Routes/HomeNavigator';
import { useAppSelector } from '../../../Hook/redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import conversationTcp from '../../../Tcp/Conversation';

export type ConversationSettingForm = {
  email: string;
};

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const ConversationSetting = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ConversationSettingForm>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();
  const authState = useAppSelector(state => state.auth.current);
  const homeRoute = useRoute<HomeScreenRouteProp>();

  const onSubmit = async (data: ConversationSettingForm) => {
    setIsLoading(true);
    const conversation = homeRoute.params?.conversationId;
    if (authState.Id && conversation) {
      await conversationTcp.addMember({
        ConversationId: conversation,
        user: { Email: data.email, PhoneNumber: data.email },
      });
    }
    await homeNavigation.goBack();
    setIsLoading(false);
  };

  return (
    <ConversationSettingLayout
      isLoading={isLoading}
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ConversationSetting;
