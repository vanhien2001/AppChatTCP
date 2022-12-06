using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class ConversationData
    {
        public ConversationData()
        {
        }
        public ConversationData(int id, string name, User user, DateTime dateCreate, List<MessageData> messages, List<GroupMemberData> groupMembers)
        {
            this.Id = id;
            this.Name = name;
            this.user = user;
            this.dateCreate = dateCreate;
            this.messages = messages;
            this.groupMembers = groupMembers;
        }
        public ConversationData(string name, User user)
        {
            this.Name = name;
            this.user = user;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public User user { get; set; }
        public DateTime dateCreate { get; set; }
        public List<MessageData> messages { get; set; }
        public List<GroupMemberData> groupMembers { get; set; }
    }
}
