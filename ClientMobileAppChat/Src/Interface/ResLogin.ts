import IUser from './User';

interface IResLogin {
  success: boolean;
  data?: IUser;
  message: string;
}

export default IResLogin;
