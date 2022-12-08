import IUser from './User';

interface IConversation {
  Id: number;
  Name: string;
  user: IUser;
  dateCreate: string;
  messages: {
    ConversationId: number;
    Date: string;
    Id: number;
    Text: string;
    user: {
      Email: string;
      Id: number;
      Name: string;
      Password: string;
      UserName: string;
    };
  }[];
  groupMembers: [
    {
      Id: number;
      ConversationId: number;
      userEmail: null;
      user: IUser;
      date: string;
    },
  ];
}

export interface IMessage {
  ConversationId: number;
  Date: string;
  Id: number;
  Text: string;
  user: {
    Email: string;
    Id: number;
    Name: string;
    Password: string;
    UserName: string;
  };
}

export default IConversation;
