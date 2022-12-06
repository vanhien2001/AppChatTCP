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
        string IP, Port = "6969";
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
                    IP = ip.ToString();
                    break;
                }
            }
            active = true;

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
                            UserData login = JsonSerializer.Deserialize<UserData>(req.data);
                            userLogin = db.User.FirstOrDefault(user => user.UserName == login.UserName);
                            if (userLogin != null)
                            {
                                if (userLogin.Password.Equals(login.Password))
                                {
                                    res = new Response("Login", true, "Login successfully !", JsonSerializer.Serialize(new UserData(userLogin)));
                                    sendJson(client, res);
                                    ListClient.Remove(userLogin.Id);
                                    ListClient.Add(userLogin.Id, client);
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
                            UserData register = JsonSerializer.Deserialize<UserData>(req.data);
                            User userCheck = db.User.FirstOrDefault(user => user.UserName == register.UserName);
                            if (userCheck == null)
                            {
                                User userCheck2 = db.User.FirstOrDefault(user => user.Email == register.Email);
                                if (userCheck2 == null)
                                {
                                    try
                                    {
                                        userController.Add(new User() { Name = register.Name, UserName = register.UserName, Password = register.Password, Email = register.Email });
                                        res = new Response("Register", true, "Register successfully !", "");
                                        sendJson(client, res);
                                    }
                                    catch(Exception e)
                                    {
                                        res = new Response("Register", false, "Server error \n" + e.Message, "");
                                        sendJson(client, res);
                                    }
                                }
                                else
                                {
                                    res = new Response("Register", false, "Email has already been taken", "");
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
                            ConversationData data = JsonSerializer.Deserialize<ConversationData>(req.data);
                            if (data != null)
                            {
                                try
                                {
                                    conversationController.Add(new Conversation() { Name = data.Name, IdUserCreate = data.user.Id, dateCreate = DateTime.Now });
                                    
                                    Conversation conversationNew = db.Conversation.FirstOrDefault(c => c.Name == data.Name && c.IdUserCreate == data.user.Id);
                                    groupMemberController.Add(new GroupMember() { ConversationId = conversationNew.Id, UserId = conversationNew.IdUserCreate , date = DateTime.Now});
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
                        case "AddMember":
                            GroupMemberData gm = JsonSerializer.Deserialize<GroupMemberData>(req.data);
                            User user = db.User.SingleOrDefault(user => user.Email == gm.userEmail);
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
                                        foreach (var groupMember in ListConversation[gm.ConversationId])
                                        {
                                            if (ListClient.ContainsKey(groupMember.UserId))
                                            {
                                                sendJson(ListClient[groupMember.UserId], res);
                                            }
                                        }
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
                                List<GroupMemberData> groupMemberDatas = new List<GroupMemberData>();
                                List<GroupMember> groupMembers = groupMemberController.GetByIdConversation(conversation.Id);
                                foreach (var groupMember in groupMembers)
                                {
                                    groupMemberDatas.Add(new GroupMemberData(groupMember.Id, groupMember.ConversationId, userController.GetById(groupMember.UserId), groupMember.date));
                                }
                                List<MessageData> messagesData = new List<MessageData>();
                                List<Message> messages = messageController.GetByIdConversation(conversation.Id);
                                foreach (var message in messages)
                                {
                                    messagesData.Add(new MessageData(message.Id, message.ConversationId, userController.GetById(message.UserId), message.Text, message.Date));
                                }
                                ConversationData conversationData = new ConversationData(conversation.Id, conversation.Name, userCreate, conversation.dateCreate, messagesData, groupMemberDatas);
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
                            List<ConversationData> conversationsData = new List<ConversationData>();
                            List<Conversation> conversations = conversationController.GetAllByIdUser(idUser);
                            foreach (var c in conversations)
                            {
                                User userCreate = userController.GetById(c.IdUserCreate);
                                List<GroupMemberData> groupMemberDatas = new List<GroupMemberData>();
                                List<GroupMember> groupMembers = groupMemberController.GetByIdConversation(c.Id);
                                foreach (var groupMember in groupMembers)
                                {
                                    groupMemberDatas.Add(new GroupMemberData(groupMember.Id, groupMember.ConversationId, userController.GetById(groupMember.UserId), groupMember.date));
                                }
                                List<MessageData> messagesData = new List<MessageData>();
                                List<Message> messages = messageController.GetByIdConversation(c.Id);
                                foreach (var message in messages)
                                {
                                    messagesData.Add(new MessageData(message.Id, message.ConversationId, userController.GetById(message.UserId), message.Text, message.Date));
                                }
                                conversationsData.Add(new ConversationData(c.Id, c.Name, userCreate, c.dateCreate, messagesData, groupMemberDatas));
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
                            MessageData messageData = JsonSerializer.Deserialize<MessageData>(req.data);
                            if (messageData != null)
                            {
                                try
                                {
                                    Message message = new Message() { ConversationId = messageData.ConversationId, UserId = messageData.user.Id, Text = messageData.Text, Date = DateTime.Now };
                                    messageController.Add(message);
                                    Message messageNew = db.Message.FirstOrDefault(m => m.ConversationId == message.ConversationId && m.UserId == message.UserId && m.Date == message.Date);
                                    MessageData messageResponse = new MessageData(messageNew.Id, messageNew.ConversationId, userController.GetById(messageNew.UserId), messageNew.Text, messageNew.Date);
                                    res = new Response("SendMessage", true, "Send message successfully", JsonSerializer.Serialize(messageResponse));
                                    foreach ( var groupMember in ListConversation[messageData.ConversationId])
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
                        case "Exit":
                            if(userLogin.Id != null)
                            {
                                Console.WriteLine("\nClient ngat ket noi : " + userLogin.Id);
                                ListClient.Remove(userLogin.Id);
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
