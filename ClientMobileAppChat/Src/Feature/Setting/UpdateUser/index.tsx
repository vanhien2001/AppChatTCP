import React, { useEffect, useState } from 'react';
import UpdateUserLayout from './Components/UpdateUserLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../Hook/redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { HomeScreenNavigationProp } from '../../../Routes/HomeNavigator';
import userTcp from '../../../Tcp/User';

export type UpdateUserForm = {
  username: string;
  name: string;
  phoneNumber: string;
  email: string;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    username: yup.string().required(),
    name: yup.string().required(),
    phoneNumber: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'too short')
      .max(10, 'too long'),
    email: yup.string().required(),
  })
  .required();

const UpdateUser = () => {
  const authState = useAppSelector(state => state.auth.current);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: authState.Name,
      username: authState.UserName,
      phoneNumber: authState.PhoneNumber,
      email: authState.Email,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const onSubmit = async (data: UpdateUserForm) => {
    setIsLoading(true);
    if (authState.Id)
      await userTcp.updateUserInfo({
        Id: authState.Id,
        Name: data.name,
        UserName: data.username,
        PhoneNumber: data.phoneNumber,
        Email: data.email,
      });
    await homeNavigation.navigate('Home');
    setIsLoading(false);
  };

  return (
    <UpdateUserLayout
      isLoading={isLoading}
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default UpdateUser;
