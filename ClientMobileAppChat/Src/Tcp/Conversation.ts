import { IP_ADDRESS, PORT } from '../Constants/IpAddress';
import TcpSocket from 'react-native-tcp-socket';

const conversationTcp = {
  createConversation: (
    data: { username: string; password: string },
    receiveDataFunc: (parseResData: any) => void,
  ) => {
    const options = {
      port: PORT,
      host: IP_ADDRESS,
    };

    const client = TcpSocket.createConnection(options, () => {
      const { username, password } = data;
      const object = {
        action: 'CreateConversation',
        data: { UserName: username, Password: password },
      };

      const decodeObject = {
        action: 'CreateConversation',
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

  getConversationByUserId: (
    data: number,
    receiveDataFunc: (parseResData: any) => void,
  ) => {
    const options = {
      port: PORT,
      host: IP_ADDRESS,
    };

    const client = TcpSocket.createConnection(options, () => {
      const object = {
        action: 'CreateConversation',
        data,
      };

      const decodeObject = {
        action: 'CreateConversation',
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
  },
};

export default conversationTcp;
