using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientAppChat.Models
{
    public class GroupMember
    {
        public GroupMember() { }
        public GroupMember(int id, int ConversationId, User user)
        {
            this.Id = id;
            this.ConversationId = ConversationId;
            this.user = user;
        }
        public GroupMember(int ConversationId, User user)
        {
            this.ConversationId = ConversationId;
            this.user = user;
        }
        public GroupMember(int ConversationId, string email)
        {
            this.ConversationId = ConversationId;
            this.userEmail = email;
        }
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public string userEmail { get; set; }
        public User user { get; set; }
        public DateTime date { get; set; }
    }
}
