using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.Controllers
{
    public class MessageController
    {
        private readonly MyDBContext _context;
        public MessageController(MyDBContext context)
        {
            _context = context;
        }
        public List<Message> GetAll()
        {
            return _context.Message.ToList();
        }
        public List<Message> GetByIdConversation(int id)
        {
            return _context.Message.Where(m => m.ConversationId == id).ToList();
        }
        public void Add(Message message)
        {
            _context.Message.Add(message);
            _context.SaveChanges();
        }
    }
}
