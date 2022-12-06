import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import EnterAddressEndpointLayout from './Components/EnterAddressEndpointLayout';
import TcpSocket from 'react-native-tcp-socket';
import { useNavigation } from '@react-navigation/native';

export type FormSubmit = {
  address: string;
  port: string;
};

const schema = yup
  .object({
    address: yup.string().required(),
    port: yup.string().required(),
  })
  .required();

const EnterAddressEndpoint = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSubmit>({
    resolver: yupResolver(schema),
    defaultValues: { address: '192.168.31.181', port: '6969' },
  });

  const onSubmit = (data: FormSubmit) => {
    const { address, port } = data;

    const options = {
      port: parseInt(port),
      host: address,
    };

    const client = TcpSocket.createConnection(options, () => {
      const object = {
        action: 'Login',
        data: { UserName: 'Khang', Password: 'Khang' },
      };

      const decodeObject = {
        action: 'Login',
        data: JSON.stringify(object.data),
      };
      console.log(decodeObject);
      client.write(JSON.stringify(decodeObject));
    });

    client.on('connect', () => {
      console.log('connected successfully');
    });

    client.on('drain', () => {
      console.log('drain');
    });

    client.on('data', data => {
      console.log('receive message');
      const resData = JSON.parse(data.toString());
      console.log(resData);

      if (resData.success) {
        navigation.navigate('Home' as never);
      } else {
      }
    });

    client.on('error', error => {
      console.log(error);
    });

    client.on('close', () => {
      console.log('Connection closed!');
    });
  };

  return (
    <EnterAddressEndpointLayout
      control={control}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default EnterAddressEndpoint;
