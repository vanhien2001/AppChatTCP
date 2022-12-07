import IConversation from './Conversation';

interface IGetConversationByUserId {
  action: string;
  data: IConversation[];
  message: string[];
  success: boolean;
}

export interface IGetConversationById {
  action: string;
  data: IConversation;
  message: string;
  success: boolean;
}

export default IGetConversationByUserId;
