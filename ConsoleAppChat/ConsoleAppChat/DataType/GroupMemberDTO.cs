using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class GroupMemberDTO
    {
        public GroupMemberDTO() { }
        public GroupMemberDTO(int id, int ConversationId, User user, DateTime date)
        {
            Id = id;
            this.ConversationId = ConversationId;
            this.user = user;
            this.date = date;
        }
        public GroupMemberDTO(int ConversationId, User user)
        {
            this.ConversationId = ConversationId;
            this.user = user;
        }
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public User user { get; set; }
        public DateTime date { get; set; }
    }
}
