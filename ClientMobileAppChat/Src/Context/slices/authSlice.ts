import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TcpSocket from 'react-native-tcp-socket';

export interface IUserState {
  current: {
    isLogIn: boolean;
    Email?: string;
    Name?: string;
    Id?: number;
    client?: TcpSocket.Socket;
  };

  error?: any;
}

const initialState: IUserState = {
  current: {
    isLogIn: false,
    Email: '',
    Name: undefined,
    Id: undefined,
    client: undefined,
  },
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<TcpSocket.Socket>) => {
      state.current.client = action.payload;
    },

    logIn: (
      state,
      action: PayloadAction<{
        Email: string;
        Name: string;
        Id: number;
      }>,
    ) => {
      state.current.isLogIn = true;
      state.current.Email = action.payload.Email;
      state.current.Name = action.payload.Name;
      state.current.Id = action.payload.Id;
    },

    logOut: state => {
      state.current.isLogIn = false;
      state.current.Email = undefined;
      state.current.Name = undefined;
      state.current.Id = undefined;
    },
  },
});

export const { logIn, logOut, setClient } = AuthSlice.actions;

export default AuthSlice.reducer;
