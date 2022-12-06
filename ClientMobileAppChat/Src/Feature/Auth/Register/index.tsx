import React, { useState } from 'react';
import RegisterLayout from './Components/RegisterLayout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import authTcp from '../../../Tcp/AuthTcp';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../../Routes/AuthRoutes';

export type RegisterFormSubmit = {
  name: string;
  username: string;
  password: string;
  email: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().required(),
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
