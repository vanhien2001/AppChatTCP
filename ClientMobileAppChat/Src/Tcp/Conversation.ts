import authTcp from './AuthTcp';
import { store } from '../Context/store';

const conversationTcp = {
  createConversation: async (data: { username: string; password: string }) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'CreateConversation',
        data,
      };

      const decodeObject = {
        action: object.action,
        data: JSON.stringify(object.data),
      };
      await clientTcp.write(JSON.stringify(decodeObject));
    }
  },

  getConversationByUserId: async (data: number) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'GetConversationByIdUser',
        data,
      };

      const decodeObject = {
        action: object.action,
        data: JSON.stringify(object.data),
      };
      await clientTcp.write(JSON.stringify(decodeObject));
    }
  },

  getConversationById: async (data: number) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'GetConversationById',
        data,
      };

      const decodeObject = {
        action: object.action,
        data: JSON.stringify(object.data),
      };
      await clientTcp.write(JSON.stringify(decodeObject));
    }
  },

  sendMessage: async (data: {
    ConversationId: number;
    user: { Id: number };
    Text: string;
  }) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'SendMessage',
        data,
      };

      const decodeObject = {
        action: object.action,
        data: JSON.stringify(object.data),
      };
      await clientTcp.write(JSON.stringify(decodeObject));
    }
  },
};

export default conversationTcp;
