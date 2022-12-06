using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientAppChat.Models
{
    public class Conversation
    {
        public Conversation() { }
        public Conversation(int id, string name, User user, DateTime dateCreate, List<Message> messages, List<GroupMember> groupMembers)
        {
            this.Id = id;
            this.Name = name;
            this.user = user;
            this.dateCreate = dateCreate;
            this.messages = messages;
            this.groupMembers = groupMembers;
        }
        public Conversation(string name, User user)
        {
            this.Name = name;
            this.user = user;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public User user { get; set; }
        public DateTime dateCreate { get; set; }
        public List<Message> messages { get; set; }
        public List<GroupMember> groupMembers { get; set; }
    }
}
