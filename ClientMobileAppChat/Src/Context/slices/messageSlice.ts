import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IConversation, { IMessage } from '../../Interface/Conversation';

export interface IUserState {
  current?: IConversation;
  error?: any;
}

const initialState: IUserState = {
  current: undefined,
};

export const MessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<IConversation>) => {
      state.current = action.payload;
    },

    pushMessage: (state, action: PayloadAction<IMessage>) => {
      if (state.current) {
        state.current.messages = [...state.current?.messages, action.payload];
      }
    },
  },
});

export const { setMessage, pushMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
