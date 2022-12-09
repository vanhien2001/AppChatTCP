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
        public GroupMember(int id, int ConversationId, User user, DateTime date)
        {
            this.Id = id;
            this.ConversationId = ConversationId;
            this.user = user;
            this.date = date;
        }
        public GroupMember(int ConversationId, User user)
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
