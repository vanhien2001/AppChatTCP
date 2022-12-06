using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class GroupMemberData
    {
        public GroupMemberData() { }
        public GroupMemberData(int id, int ConversationId, User user, DateTime date)
        {
            Id = id;
            this.ConversationId = ConversationId;
            this.user = user;
            this.date = date;
        }
        public GroupMemberData(int ConversationId, User user)
        {
            this.ConversationId = ConversationId;
            this.user = user;
        }
        public GroupMemberData(int ConversationId, string email)
        {
            this.ConversationId = ConversationId;
            userEmail = email;
        }
        public int Id { get; set; }
        public int ConversationId { get; set; }

        public string userEmail { get; set; }
        public User user { get; set; }
        public DateTime date { get; set; }
    }
}
