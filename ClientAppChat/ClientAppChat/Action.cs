using ClientAppChat.Models;
using Microsoft.VisualBasic.ApplicationServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;
using Message = ClientAppChat.Models.Message;
using User = ClientAppChat.Models.User;

namespace ClientAppChat
{
    public class Action
    {
        //TcpClient client;
        Socket client;
        byte[] data = new byte[20480];

        public Action(Socket client)
        {
            this.client = client;
        }

        private void sendJson(object obj)
        {
            byte[] jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(obj);
            client.Send(jsonUtf8Bytes, jsonUtf8Bytes.Length, SocketFlags.None);
        }
        public Response Register(User user)
        {
            string jsonString = JsonSerializer.Serialize(user);
            Request req = new Request("Register", jsonString);
            sendJson(req);
            int recv = client.Receive(data);
            jsonString = Encoding.ASCII.GetString(data, 0, recv);
            client.Close();
            return JsonSerializer.Deserialize<Response>(jsonString);
        }

        public Response Login(string username, string password)
        {
            string jsonString = JsonSerializer.Serialize(new { UserName = username, Password = password });
            Request req = new Request("Login", jsonString);
            sendJson(req);
            int recv = client.Receive(data);
            jsonString = Encoding.ASCII.GetString(data, 0, recv);
            return JsonSerializer.Deserialize<Response>(jsonString);
        }

        public void CreateConversation(string name, User user)
        {
            string jsonString = JsonSerializer.Serialize(new { Name = name, user = new { Id = user.Id } });
            Request req = new Request("CreateConversation", jsonString);
            sendJson(req);
        }

        public void CreateConversationPrivate(int id, string inforUser2)
        {
            string jsonString = JsonSerializer.Serialize(new { user1 = new { Id = id }, user2 = new { PhoneNumber = inforUser2, Email = inforUser2 } });
            Request req = new Request("CreateConversationPrivate", jsonString);
            sendJson(req);
        }
        public void AddMember(int id, string infor)
        {
            string jsonString = JsonSerializer.Serialize(new { ConversationId = id, user = new { Email = infor, PhoneNumber = infor } });
            Request req = new Request("AddMember", jsonString);
            sendJson(req);
        }

        public void GetConversationById(int id)
        {
            string jsonString = JsonSerializer.Serialize(id);
            Request req = new Request("GetConversationById", jsonString);
            sendJson(req);
        }
        public void GetConversationByIdUser(int id)
        {
            string jsonString = JsonSerializer.Serialize(id);
            Request req = new Request("GetConversationByIdUser", jsonString);
            sendJson(req);
        }
        public void SendMessage(int conversationId, User user, string text)
        {
            string jsonString = JsonSerializer.Serialize(new { ConversationId  = conversationId, user = new { Id = user.Id }, Text = text });
            Request req = new Request("SendMessage", jsonString);
            sendJson(req);
        }
        public void GetUserById(int userId)
        {
            string jsonString = JsonSerializer.Serialize(userId);
            Request req = new Request("GetUserById", jsonString);
            sendJson(req);
        }
        public void UpdateUserInfor(User user)
        {
            string jsonString = JsonSerializer.Serialize(user);
            Request req = new Request("UpdateUserInfor", jsonString);
            sendJson(req);
        }
        public void DeleteMember(int id)
        {
            string jsonString = JsonSerializer.Serialize(id);
            Request req = new Request("DeleteMember", jsonString);
            sendJson(req);
        }
        public void Exit()
        {
            Request req = new Request("Exit", "");
            sendJson(req);
        }
    }
}
