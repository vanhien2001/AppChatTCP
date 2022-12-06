import TcpSocket from 'react-native-tcp-socket';
import { IP_ADDRESS, PORT } from '../Constants/IpAddress';
import IResLogin from '../Interface/ResLogin';

const authTcp = {
  login: (
    data: { username: string; password: string },
    receiveDataFunc: (parseResData: IResLogin) => void,
  ) => {
    const options = {
      port: PORT,
      host: IP_ADDRESS,
    };

    const client = TcpSocket.createConnection(options, () => {
      const { username, password } = data;
      const object = {
        action: 'Login',
        data: { UserName: username, Password: password },
      };

      const decodeObject = {
        action: 'Login',
        data: JSON.stringify(object.data),
      };
      client.write(JSON.stringify(decodeObject));
    });

    client.on('connect', () => {
      console.log('connected successfully');
    });

    client.on('drain', () => {
      console.log('drain');
    });

    client.on('data', async data => {
      console.log('receive message');
      const resData = JSON.parse(data.toString());

      if (resData.success) {
        const parseResData = { ...resData, data: JSON.parse(resData.data) };
        receiveDataFunc(parseResData);
      }
    });

    client.on('error', error => {
      console.log('error : ' + error);
    });

    client.on('close', () => {
      console.log('Connection closed!');
    });

    client.destroy();
  },

  register: (
    data: { name: string; username: string; password: string; email: string },
    receiveDataFunc: (parseResData: IResLogin) => void,
  ) => {
    const options = {
      port: PORT,
      host: IP_ADDRESS,
    };

    const client = TcpSocket.createConnection(options, () => {
      const { name, username, password, email } = data;
      const object = {
        action: 'Register',
        data: {
          Name: name,
          Username: username,
          Password: password,
          Email: email,
        },
      };

      const decodeObject = {
        action: 'Register',
        data: JSON.stringify(object.data),
      };
      client.write(JSON.stringify(decodeObject));
    });

    client.on('connect', () => {
      console.log('connected successfully');
    });

    client.on('drain', () => {
      console.log('drain');
    });

    client.on('data', async data => {
      console.log(data.toString());
      console.log('receive message');
      const resData = JSON.parse(data.toString());

      if (resData.success) {
        const parseResData = { ...resData, data: JSON.parse(resData.data) };
        receiveDataFunc(parseResData);
      }
    });

    client.on('error', error => {
      console.log('error : ' + error);
    });

    client.on('close', () => {
      console.log('Connection closed!');
    });

    client.destroy();
  },
};

export default authTcp;
