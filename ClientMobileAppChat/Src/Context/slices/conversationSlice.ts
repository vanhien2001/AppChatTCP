import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import IConversation from '../../Interface/Conversation';

export interface IUserState {
  current?: IConversation[];
  error?: any;
}

const initialState: IUserState = {
  current: undefined,
};

export const ConversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<IConversation[]>) => {
      state.current = action.payload;
    },
  },
});

export const { setConversation } = ConversationSlice.actions;

export default ConversationSlice.reducer;
