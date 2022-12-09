import authTcp from './AuthTcp';

const conversationTcp = {
  getConversationByUserId: async (data: number) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'GetConversationByIdUser',
        data: data.toString(),
      };

      const decodeObject = await JSON.stringify(object);
      await clientTcp.write(decodeObject);
    }
  },

  addMember: async (data: {
    ConversationId: number;
    user: { Email: string; PhoneNumber: string };
  }) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'AddMember',
        data: JSON.stringify(data),
      };

      const decodeObject = await JSON.stringify(object);
      await clientTcp.write(decodeObject);
    }
  },

  deleteMember: async (data: number) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'DeleteMember',
        data: data.toString(),
      };

      const decodeObject = await JSON.stringify(object);
      await clientTcp.write(decodeObject);
    }
  },

  getConversationById: async (data: number) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'GetConversationById',
        data: data.toString(),
      };
      const decodeObject = await JSON.stringify(object);
      await clientTcp.write(decodeObject);
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

  createConversationPrivate: async (data: {
    user1: { Id: number };
    user2: { PhoneNumber: string; Email: string };
  }) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'CreateConversationPrivate',
        data,
      };

      const decodeObject = {
        action: object.action,
        data: JSON.stringify(object.data),
      };
      await clientTcp.write(JSON.stringify(decodeObject));
    }
  },

  createConversation: async (data: { Name: string; user: { Id: number } }) => {
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
};

export default conversationTcp;
