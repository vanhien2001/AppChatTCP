import TcpSocket from 'react-native-tcp-socket';
import { IP_ADDRESS, PORT } from '../Constants/IpAddress';
import { setConversation } from '../Context/slices/conversationSlice';
import { pushMessage, setMessage } from '../Context/slices/messageSlice';
import { store } from '../Context/store';
import IResLogin from '../Interface/ResLogin';

let temp: TcpSocket.Socket;

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
        action: object.action,
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
        console.log(resData);
        const temp = JSON.parse(resData.data);
        switch (resData.action) {
          case 'GetConversationByIdUser':
            store.dispatch(setConversation(temp));
            break;

          case 'GetConversationById':
            store.dispatch(setMessage(temp));
            break;

          case 'SendMessage':
            store.dispatch(pushMessage(temp));
            break;

          case 'Login':
            const parseResData = { ...resData, data: JSON.parse(resData.data) };
            receiveDataFunc(parseResData);
            break;
        }
      }
    });

    client.on('error', error => {
      console.log('error : ' + error);
    });

    client.on('close', () => {
      console.log('Connection closed!');
    });
    temp = client;
  },

  getClient: () => {
    // store.dispatch(setClient(temp));
    return temp;
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
