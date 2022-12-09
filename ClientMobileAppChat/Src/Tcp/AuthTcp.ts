import TcpSocket from 'react-native-tcp-socket';
import { IP_ADDRESS, PORT } from '../Constants/IpAddress';
import { setConversation } from '../Context/slices/conversationSlice';
import { pushMessage, setMessage } from '../Context/slices/messageSlice';
import { store } from '../Context/store';
import IResLogin from '../Interface/ResLogin';
import conversationTcp from './Conversation';
import Toast from 'react-native-toast-message';
import { setUserActive } from '../Context/slices/userActive';

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

    const client = TcpSocket.createConnection(options, async () => {
      const { username, password } = data;
      const object = {
        action: 'Login',
        data: { UserName: username, Password: password },
      };
      const decodeObject = {
        action: object.action,
        data: await JSON.stringify(object.data),
      };

      client.write(await JSON.stringify(decodeObject));
    });

    client.on('connect', () => {
      console.log('connected successfully');
    });

    client.on('drain', () => {
      console.log('drain');
    });

    client.on('data', async data => {
      console.log('receive message');

      const dataToString = await data.toString();

      try {
        console.log(dataToString);
        await JSON.parse(dataToString);
      } catch (error) {
        console.log(error);
        console.log('cannot parse dataToString');
        return;
      }
      const resData = await JSON.parse(dataToString);
      let parseData;
      if (resData.data !== '') {
        parseData = await JSON.parse(resData.data);
      } else {
        parseData = resData.data;
      }
      const userId = store.getState().auth.current.Id;

      switch (resData.action) {
        case 'GetConversationByIdUser':
          if (resData.success) {
            store.dispatch(setConversation(parseData));
          }
          break;

        case 'GetConversationById':
          if (resData.success) store.dispatch(setMessage(parseData));
          break;

        case 'SendMessage':
          if (resData.success) store.dispatch(pushMessage(parseData));
          break;

        case 'CreateConversation':
          if (resData.success && userId) {
            await conversationTcp.getConversationByUserId(userId);
          } else {
            Toast.show({
              type: 'error',
              text1: 'This is an error message',
            });
          }
          break;

        case 'CreateConversationPrivate':
          if (resData.success && userId) {
            await conversationTcp.getConversationByUserId(userId);
          } else {
            console.log(resData.message);
            Toast.show({
              type: 'error',
              text1: 'This is an error message',
              text2: resData.message,
            });
          }
          break;
        case 'AddMember':
          if (resData.success) {
            Toast.show({
              type: 'success',
              text1: 'AddMember',
              text2: 'Add member successfully',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: resData.message,
            });
          }
          break;

        case 'Login':
          const parseResData = {
            ...resData,
            data: parseData,
          };
          receiveDataFunc(parseResData);
          break;

        case 'GetListClientConnect':
          if (resData.success && userId) {
            store.dispatch(setUserActive(resData.data));
          }
          break;

        case 'UpdateUserInfor':
          if (resData.success) {
            Toast.show({
              type: 'success',
              text1: 'Update User',
              text2: 'Update user successfully',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: resData.message,
            });
          }
          break;

        case 'DeleteMember':
          if (resData.success) {
            Toast.show({
              type: 'success',
              text1: 'Delete User',
              text2: 'Delete user successfully',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: resData.message,
            });
          }
          break;
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
    data: {
      name: string;
      username: string;
      password: string;
      email: string;
      phoneNumber: string;
    },
    receiveDataFunc: (parseResData: IResLogin) => void,
  ) => {
    const options = {
      port: PORT,
      host: IP_ADDRESS,
    };

    const client = TcpSocket.createConnection(options, () => {
      const { name, username, password, email, phoneNumber } = data;
      const object = {
        action: 'Register',
        data: {
          Id: 0,
          Name: name,
          UserName: username,
          Password: password,
          Email: email,
          PhoneNumber: phoneNumber,
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
      const dataToString = await data.toString();

      try {
        console.log(dataToString);
        await JSON.parse(dataToString);
      } catch (error) {
        console.log(error);
        console.log('cannot parse dataToString');
        return;
      }
      const resData = await JSON.parse(dataToString);
      let parseData;
      if (resData.data !== '') {
        parseData = await JSON.parse(resData.data);
      } else {
        parseData = resData.data;
      }
      const parseResData = {
        ...resData,
        data: parseData,
      };
      receiveDataFunc(parseResData);
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
