using System.Net.Sockets;
using System.Net;
using System.Text;
using System.Text.Json;
using ConsoleAppChat.Controllers;
using ConsoleAppChat.Models;
using System.Collections.Generic;
using ConsoleAppChat.DataType;

namespace ConsoleAppChat
{
    public class Server
    {
        IPEndPoint iep;
        //TcpListener server;
        Socket server;
        string IP = "192.168.1.127", Port = "6969";
        bool active = false;
        private MyDBContext db = new MyDBContext();
        Dictionary<int, List<GroupMember>> ListConversation;
        Dictionary<int, Socket> ListClient = new Dictionary<int, Socket>();

        public void Start()
        {
            Console.WriteLine("-------------------------------------- App Chat TCP ----------------------------\n");
            string hostName = Dns.GetHostName();
            Console.WriteLine("Hostname : " + hostName);
            foreach (IPAddress ip in Dns.GetHostByName(hostName).AddressList)
            {
                if (ip.ToString().Contains("."))
                {
                    //IP = ip.ToString();
                    break;
                }
            }
            active = true;

            //iep = new IPEndPoint(IPAddress.Parse("192.168.28.188"), int.Parse(Port));
            iep = new IPEndPoint(IPAddress.Parse(IP), int.Parse(Port));
            server = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            server.Bind(iep);
            server.Listen(10);
            //iep = new IPEndPoint(IPAddress.Parse(IP), int.Parse(Port));
            //server = new TcpListener(iep);
            //server.Start();
            getListConversation();
            Console.WriteLine("IP: " + IP + " - Port: " + Port);
            Console.WriteLine("Server listening .....");
            Console.WriteLine("\n--------------------------------------------------------------------------------\n");
            while (active)
            {
                try
                {
                    Socket client = server.Accept();
                    //TcpClient client = server.AcceptTcpClient();
                    Console.WriteLine("Client connect !");
                    var t = new Thread(() => ThreadClient(client));
                    t.Start();
                }
                catch (Exception e)
                {
                    active = false;
                    Console.WriteLine(e.Message);
                }

            }
        }
        private void ThreadClient(Socket client)
        {
            UserController userController = new UserController(db);
            ConversationController conversationController = new ConversationController(db);
            GroupMemberController groupMemberController = new GroupMemberController(db);
            MessageController messageController = new MessageController(db);
            Response res = new Response("", false, "", "");
            bool listen = true;
            User userLogin = new User();
            while (listen)
            {

                byte[] dataRec = new byte[10240];
                //StreamReader sr = new StreamReader(client.GetStream());

                int recv = client.Receive(dataRec);
                if (recv == 0) return;
                //string jsonString = sr.ReadLine();
                string jsonString = Encoding.ASCII.GetString(dataRec, 0, recv);

                Request req = JsonSerializer.Deserialize<Request>(jsonString);
                Console.WriteLine("\n--------------------------------------------------------------------------------\n");
                Console.WriteLine("Request action : " + req.action);
                Console.WriteLine("Request data : " + req.data);
                if (req != null)
                {
                    switch (req.action)
                    {
                        case "Login":
                            UserDTO login = JsonSerializer.Deserialize<UserDTO>(req.data);
                            userLogin = db.User.FirstOrDefault(user => user.UserName == login.UserName);
                            if (userLogin != null)
                            {
                                if (userLogin.Password.Equals(login.Password))
                                {
                                    res = new Response("Login", true, "Login successfully !", JsonSerializer.Serialize(new UserDTO(userLogin)));
                                    sendJson(client, res);
                                    Console.WriteLine("Client connect !");
                                    ListClient.Remove(userLogin.Id);
                                    ListClient.Add(userLogin.Id, client);
                                    List<int> idClients= new List<int>();
                                    foreach ( int idClient in ListClient.Keys)
                                    {
                                        idClients.Add(idClient);
                                    }
                                    foreach (int idClient in ListClient.Keys)
                                    {
                                        res = new Response("GetListClientConnect", true, "", JsonSerializer.Serialize(idClients));
                                        sendJson(ListClient[idClient], res);
                                    }
                                }
                                else
                                {
                                    res = new Response("Login", false, "The password is incorrect!", "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("Login", false, "Invalid username !", "");
                                sendJson(client, res);
                            }
                            break;
                        case "Register":
                            UserDTO register = JsonSerializer.Deserialize<UserDTO>(req.data);
                            User userCheck = db.User.FirstOrDefault(user => user.UserName == register.UserName);
                            if (userCheck == null)
                            {
                                User userCheck2 = db.User.FirstOrDefault(user => user.Email == register.Email || user.PhoneNumber == register.PhoneNumber);
                                if (userCheck2 == null)
                                {
                                    try
                                    {
                                        userController.Add(new User() { Name = register.Name, UserName = register.UserName, Password = register.Password, PhoneNumber = register.PhoneNumber, Email = register.Email });
                                        res = new Response("Register", true, "Register successfully !", "");
                                        sendJson(client, res);
                                    }
                                    catch (Exception e)
                                    {
                                        res = new Response("Register", false, "Server error \n" + e.Message, "");
                                        sendJson(client, res);
                                    }
                                }
                                else
                                {
                                    res = new Response("Register", false, "Email or phone number has already been taken", "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("Register", false, "Username has already been taken", "");
                                sendJson(client, res);
                            }
                            break;
                        case "CreateConversation":
                            ConversationDTO data = JsonSerializer.Deserialize<ConversationDTO>(req.data);
                            if (data != null)
                            {
                                try
                                {
                                    conversationController.Add(new Conversation() { Name = data.Name, IdUserCreate = data.user.Id, dateCreate = DateTime.Now, Group = true });

                                    Conversation conversationNew = db.Conversation.FirstOrDefault(c => c.Name == data.Name && c.IdUserCreate == data.user.Id);
                                    groupMemberController.Add(new GroupMember() { ConversationId = conversationNew.Id, UserId = conversationNew.IdUserCreate, date = DateTime.Now });
                                    res = new Response("CreateConversation", true, "Create conversation successfully", "");

                                    sendJson(client, res);
                                    getListConversation();
                                }
                                catch (Exception e)
                                {
                                    res = new Response("CreateConversation", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("CreateConversation", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "CreateConversationPrivate":
                            ConversationPrivateDTO data1 = JsonSerializer.Deserialize<ConversationPrivateDTO>(req.data);
                            if (data1 != null)
                            {
                                try
                                {
                                    User user2 = db.User.SingleOrDefault(user => user.Email == data1.user2.Email || user.PhoneNumber == data1.user2.PhoneNumber);
                                    if (user2 != null)
                                    {
                                        conversationController.Add(new Conversation() { Name = data1.user1.Id + " - " + user2.Id, IdUserCreate = data1.user1.Id, dateCreate = DateTime.Now, Group = false });

                                        Conversation conversationNew = db.Conversation.FirstOrDefault(c => c.Name == data1.user1.Id + " - " + user2.Id && c.IdUserCreate == data1.user1.Id);
                                        groupMemberController.Add(new GroupMember() { ConversationId = conversationNew.Id, UserId = data1.user1.Id, date = DateTime.Now });
                                        groupMemberController.Add(new GroupMember() { ConversationId = conversationNew.Id, UserId = user2.Id, date = DateTime.Now });
                                        res = new Response("CreateConversation", true, "Create conversation successfully", "");

                                        if (ListClient.ContainsKey(data1.user1.Id))
                                        {
                                            sendJson(ListClient[data1.user1.Id], res);
                                        }
                                        if (ListClient.ContainsKey(user2.Id))
                                        {
                                            sendJson(ListClient[user2.Id], res);
                                        }
                                        getListConversation();
                                    }
                                    else
                                    {
                                        res = new Response("CreateConversation", false, "Can't find user", "");
                                        sendJson(client, res);
                                    }
                                }
                                catch (Exception e)
                                {
                                    res = new Response("CreateConversation", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("CreateConversation", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "AddMember":
                            GroupMemberDTO gm = JsonSerializer.Deserialize<GroupMemberDTO>(req.data);
                            User user = db.User.SingleOrDefault(user => user.Email == gm.user.Email || user.PhoneNumber == gm.user.PhoneNumber);
                            if (user != null)
                            {
                                GroupMember gmCheck = db.GroupMember.SingleOrDefault(g => g.ConversationId == gm.ConversationId && g.UserId == user.Id);
                                if (gmCheck == null)
                                {
                                    try
                                    {
                                        groupMemberController.Add(new GroupMember() { ConversationId = gm.ConversationId, UserId = user.Id, date = DateTime.Now });
                                        res = new Response("AddMember", true, "Add member successfully", "");
                                        sendJson(client, res);
                                        getListConversation();
                                        res = new Response("CreateConversation", true, "Create conversation successfully", "");
                                        //foreach (var groupMember in ListConversation[gm.ConversationId])
                                        //{
                                            if (ListClient.ContainsKey(user.Id))
                                            {
                                                sendJson(ListClient[user.Id], res);
                                            }
                                        //}
                                    }
                                    catch (Exception e)
                                    {
                                        res = new Response("AddMember", false, "Cant not add member\n" + e.Message, "");
                                        sendJson(client, res);
                                    }
                                }
                                else
                                {
                                    res = new Response("AddMember", false, "User has already in group", "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("AddMember", false, "User is not exit", "");
                                sendJson(client, res);
                            }
                            break;
                        case "GetConversationById":
                            int id = JsonSerializer.Deserialize<int>(req.data);
                            Conversation conversation = db.Conversation.SingleOrDefault(c => c.Id == id);
                            if (conversation != null)
                            {
                                User userCreate = userController.GetById(conversation.IdUserCreate);
                                List<GroupMemberDTO> groupMemberDatas = new List<GroupMemberDTO>();
                                List<GroupMember> groupMembers = groupMemberController.GetByIdConversation(conversation.Id);
                                foreach (var groupMember in groupMembers)
                                {
                                    groupMemberDatas.Add(new GroupMemberDTO(groupMember.Id, groupMember.ConversationId, userController.GetById(groupMember.UserId), groupMember.date));
                                }
                                List<MessageDTO> messagesData = new List<MessageDTO>();
                                List<Message> messages = messageController.GetByIdConversation(conversation.Id);
                                foreach (var message in messages)
                                {
                                    messagesData.Add(new MessageDTO(message.Id, message.ConversationId, userController.GetById(message.UserId), message.Text, message.Date));
                                }
                                ConversationDTO conversationData = new ConversationDTO(conversation.Id, conversation.Name, userCreate, conversation.Group, conversation.dateCreate, messagesData, groupMemberDatas);
                                res = new Response("GetConversationById", true, "Get successfully !", JsonSerializer.Serialize(conversationData));
                                sendJson(client, res);
                            }
                            else
                            {
                                res = new Response("GetConversationById", false, "Not found", "");
                                sendJson(client, res);
                            }
                            break;
                        case "GetConversationByIdUser":
                            int idUser = JsonSerializer.Deserialize<int>(req.data);
                            List<ConversationDTO> conversationsData = new List<ConversationDTO>();
                            List<Conversation> conversations = conversationController.GetAllByIdUser(idUser);
                            foreach (var c in conversations)
                            {
                                User userCreate = userController.GetById(c.IdUserCreate);
                                List<GroupMemberDTO> groupMemberDatas = new List<GroupMemberDTO>();
                                List<GroupMember> groupMembers = groupMemberController.GetByIdConversation(c.Id);
                                foreach (var groupMember in groupMembers)
                                {
                                    groupMemberDatas.Add(new GroupMemberDTO(groupMember.Id, groupMember.ConversationId, userController.GetById(groupMember.UserId), groupMember.date));
                                }
                                List<MessageDTO> messagesData = new List<MessageDTO>();
                                List<Message> messages = messageController.GetByIdConversation(c.Id);
                                foreach (var message in messages)
                                {
                                    messagesData.Add(new MessageDTO(message.Id, message.ConversationId, userController.GetById(message.UserId), message.Text, message.Date));
                                }
                                conversationsData.Add(new ConversationDTO(c.Id, c.Name, userCreate, c.Group, c.dateCreate, messagesData, groupMemberDatas));
                            }
                            try
                            {
                                res = new Response("GetConversationByIdUser", true, "Get successfully !", JsonSerializer.Serialize(conversationsData));
                                sendJson(client, res);
                            }
                            catch (Exception e)
                            {
                                res = new Response("GetConversationByIdUser", false, e.Message, "");
                                sendJson(client, res);
                            }
                            break;
                        case "SendMessage":
                            MessageDTO messageData = JsonSerializer.Deserialize<MessageDTO>(req.data);
                            if (messageData != null)
                            {
                                try
                                {
                                    Message message = new Message() { ConversationId = messageData.ConversationId, UserId = messageData.user.Id, Text = messageData.Text, Date = DateTime.Now };
                                    messageController.Add(message);
                                    Message messageNew = db.Message.FirstOrDefault(m => m.ConversationId == message.ConversationId && m.UserId == message.UserId && m.Date == message.Date);
                                    MessageDTO messageResponse = new MessageDTO(messageNew.Id, messageNew.ConversationId, userController.GetById(messageNew.UserId), messageNew.Text, messageNew.Date);
                                    res = new Response("SendMessage", true, "Send message successfully", JsonSerializer.Serialize(messageResponse));
                                    foreach (var groupMember in ListConversation[messageData.ConversationId])
                                    {
                                        if (ListClient.ContainsKey(groupMember.UserId))
                                        {
                                            sendJson(ListClient[groupMember.UserId], res);
                                        }
                                    }
                                }
                                catch (Exception e)
                                {
                                    res = new Response("CreateConversation", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("CreateConversation", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "GetUserById":
                            int idU = JsonSerializer.Deserialize<int>(req.data);
                            if (idU != null)
                            {
                                try
                                {
                                    User a =  userController.GetById(idU);
                                    if(a != null)
                                    {
                                        res = new Response("GetUserById", true, "Get successfully !", JsonSerializer.Serialize(a));
                                        sendJson(client, res);
                                    }
                                    else
                                    {
                                        res = new Response("GetUserById", false, "Can't find user !", "");
                                        sendJson(client, res);
                                    }
                                }
                                catch (Exception e)
                                {
                                    res = new Response("GetUserById", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("GetUserById", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "UpdateUserInfor":
                            User userInfor = JsonSerializer.Deserialize<User>(req.data);
                            if (userInfor != null)
                            {
                                try
                                {
                                    userController.Update(userInfor);
                                    res = new Response("UpdateUserInfor", true, "Update successfully !", "");
                                    sendJson(client, res);
                                }
                                catch (Exception e)
                                {
                                    res = new Response("UpdateUserInfor", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("UpdateUserInfor", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "DeleteMember":
                            int gmId = JsonSerializer.Deserialize<int>(req.data);
                            if (gmId != null)
                            {
                                try
                                {
                                    var gm1 = groupMemberController.GetById(gmId);
                                    groupMemberController.Delete(gmId);
                                    if (ListClient.ContainsKey(gm1.UserId))
                                    {
                                        res = new Response("CreateConversation", true, "", "");
                                        sendJson(ListClient[gm1.UserId], res);
                                    }
                                    res = new Response("DeleteMember", true, "Delete successfully !", "");
                                    sendJson(client, res);
                                }
                                catch (Exception e)
                                {
                                    res = new Response("DeleteMember", false, e.Message, "");
                                    sendJson(client, res);
                                }
                            }
                            else
                            {
                                res = new Response("UpdateUserInfor", false, "Missing data", "");
                                sendJson(client, res);
                            }
                            break;
                        case "Exit":
                            if (userLogin.Id != null)
                            {
                                Console.WriteLine("\nClient ngat ket noi : " + userLogin.Id);
                                ListClient.Remove(userLogin.Id);

                                List<int> idClients = new List<int>();
                                foreach (int idClient in ListClient.Keys)
                                {
                                    idClients.Add(idClient);
                                }
                                foreach (int idClient in ListClient.Keys)
                                {
                                    res = new Response("GetListClientConnect", true, "", JsonSerializer.Serialize(idClients));
                                    sendJson(ListClient[idClient], res);
                                }

                                res = new Response("Exit", false, "User disconnect : " + userLogin.Id, "");
                            }
                            client.Close();
                            listen = false;
                            Console.WriteLine("\n---------------------------Disconnect----------------------------");
                            break;
                    }
                    Console.WriteLine("Response message : " + res.message + "\nResponse data : " + res.data);
                }
                Console.WriteLine("\n--------------------------------------------------------------------------------\n");
            }
        }
        private void sendJson(Socket client, object obj)
        {
            byte[] jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
            client.Send(jsonUtf8Bytes, jsonUtf8Bytes.Length, SocketFlags.None);
            //StreamWriter sw = new StreamWriter(client.GetStream());
            //String S = Encoding.ASCII.GetString(jsonUtf8Bytes, 0, jsonUtf8Bytes.Length);
            //sw.WriteLine(S);
            //sw.Flush();
        }

        private void getListConversation()
        {
            ListConversation = new Dictionary<int, List<GroupMember>>();
            List<Conversation> conversations = (new ConversationController(db)).GetAll();
            foreach (var c in conversations)
            {
                List<GroupMember> groupMembers = (new GroupMemberController(db)).GetByIdConversation(c.Id);
                ListConversation.Add(c.Id, groupMembers);
            }
        }
    }
}
