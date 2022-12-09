import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TcpSocket from 'react-native-tcp-socket';
import { IP_ADDRESS, PORT } from '../../../Constants/IpAddress';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../../Routes/HomeNavigator';
import { useAppDispatch } from '../../../Hook/redux';
import { logIn } from '../../../Context/slices/authSlice';
import LoginLayout from './Components/LoginLayout';
import authTcp from '../../../Tcp/AuthTcp';

export type LoginFormSubmit = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSubmit>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const onSubmit = async (data: LoginFormSubmit) => {
    console.log(IP_ADDRESS);
    setIsLoading(true);

    await authTcp.login(data, async resData => {
      if (resData.success) {
        if (resData.data) {
          const { data } = resData;
          console.log(data);
          await dispatch(
            logIn({
              Email: data.Email,
              Name: data.Name,
              Id: data.Id,
              UserName: data.UserName,
              PhoneNumber: data.PhoneNumber,
            }),
          );
        }
        await homeNavigation.navigate('Home');
        setIsLoading(false);
      } else {
        setError(resData.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <LoginLayout
      isLoading={isLoading}
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default Login;
