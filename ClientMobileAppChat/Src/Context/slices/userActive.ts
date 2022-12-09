import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TcpSocket from 'react-native-tcp-socket';

export interface IUserState {
  current: number[];

  error?: any;
}

const initialState: IUserState = {
  current: [],
};

export const userActiveSlice = createSlice({
  name: 'userActive',
  initialState,
  reducers: {
    setUserActive: (state, action: PayloadAction<number[]>) => {
      state.current = action.payload;
    },
  },
});

export const { setUserActive } = userActiveSlice.actions;

export default userActiveSlice.reducer;
