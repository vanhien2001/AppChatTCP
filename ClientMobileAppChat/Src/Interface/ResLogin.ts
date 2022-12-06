interface IResLogin {
  success: boolean;
  data?: {
    Id: number;
    Name: string;
    UserName: string;
    Password: string;
    Email: string;
  };
  message: string;
}

export default IResLogin;
