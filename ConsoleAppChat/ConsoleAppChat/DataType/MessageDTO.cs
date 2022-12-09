using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.DataType
{
    public class MessageDTO
    {
        public MessageDTO() { }
        public MessageDTO(int id, int conversationId, User user, string text, DateTime date)
        {
            Id = id;
            ConversationId = conversationId;
            this.user = user;
            Text = text;
            Date = date;
        }

        public int Id { get; set; }
        public int ConversationId { get; set; }
        public User user { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
