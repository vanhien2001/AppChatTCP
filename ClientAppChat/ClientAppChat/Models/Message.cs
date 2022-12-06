using Microsoft.VisualBasic.ApplicationServices;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientAppChat.Models
{
    public class Message
    {
        public Message() { }
        public Message(int id, int conversationId, User user, string text, DateTime date)
        {
            this.Id = id;
            this.ConversationId = conversationId;
            this.user = user;
            this.Text = text;
            this.Date = date;
        }
        public Message(int conversationId, User user, string text)
        {
            this.ConversationId = conversationId;
            this.user = user;
            this.Text = text;
        }

        public int Id { get; set; }
        public int ConversationId { get; set; }
        public User user { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
