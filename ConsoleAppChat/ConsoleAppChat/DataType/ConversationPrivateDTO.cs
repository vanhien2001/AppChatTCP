using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class ConversationPrivateDTO
    {
        public ConversationPrivateDTO()
        {
        }
        public ConversationPrivateDTO(int id, string name, User user1, User user2, DateTime dateCreate, List<MessageDTO> messages)
        {
            this.Id = id;
            this.Name = name;
            this.user1 = user1;
            this.user2 = user2;
            this.dateCreate = dateCreate;
            this.messages = messages;
        }
        public ConversationPrivateDTO(string name, User user1, User user2)
        {
            this.Name = name;
            this.user1 = user1;
            this.user2 = user2;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public User user1 { get; set; }
        public User user2 { get; set; }
        public DateTime dateCreate { get; set; }
        public List<MessageDTO> messages { get; set; }
    }
}
