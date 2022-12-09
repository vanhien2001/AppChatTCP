using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class ConversationDTO
    {
        public ConversationDTO()
        {
        }
        public ConversationDTO(int id, string name, User user, Boolean group, DateTime dateCreate, List<MessageDTO> messages, List<GroupMemberDTO> groupMembers)
        {
            this.Id = id;
            this.Name = name;
            this.user = user;
            this.Group= group;
            this.dateCreate = dateCreate;
            this.messages = messages;
            this.groupMembers = groupMembers;
        }
        public ConversationDTO(string name, User user)
        {
            this.Name = name;
            this.user = user;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public User user { get; set; }
        public Boolean Group { get; set; }
        public DateTime dateCreate { get; set; }
        public List<MessageDTO> messages { get; set; }
        public List<GroupMemberDTO> groupMembers { get; set; }
    }
}
