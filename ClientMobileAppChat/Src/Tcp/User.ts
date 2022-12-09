import authTcp from './AuthTcp';

const userTcp = {
  updateUserInfo: async (data: {
    Id: number;
    Name: string;
    UserName: string;
    PhoneNumber: string;
    Email: string;
  }) => {
    const clientTcp = authTcp.getClient();
    if (clientTcp) {
      const object = {
        action: 'UpdateUserInfor',
        data: JSON.stringify(data),
      };

      const decodeObject = await JSON.stringify(object);
      await clientTcp.write(decodeObject);
    }
  },
};

export default userTcp;
