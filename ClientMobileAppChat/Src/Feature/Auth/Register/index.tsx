import React, { useState } from 'react';
import RegisterLayout from './Components/RegisterLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import authTcp from '../../../Tcp/AuthTcp';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../../Routes/AuthRoutes';
import Toast from 'react-native-toast-message';

export type RegisterFormSubmit = {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    phoneNumber: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'too short')
      .max(10, 'too long'),
    email: yup.string().email().required(),
  })
  .required();

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSubmit>({ resolver: yupResolver(schema) });
  const authNavigate = useNavigation<AuthScreenNavigationProp>();
  const [error, setError] = useState('');

  const onSubmit = async (data: RegisterFormSubmit) => {
    authTcp.register(data, async resData => {
      if (resData.success) {
        Toast.show({
          type: 'success',
          text1: 'Register',
          text2: 'Register successfully!',
        });
        authNavigate.push('Login');
      } else {
        setError(resData.message);
      }
    });
  };

  return (
    <RegisterLayout
      error={error}
      errors={errors}
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default Register;
