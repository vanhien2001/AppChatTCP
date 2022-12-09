using ConsoleAppChat.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.Controllers
{
    internal class ConversationController
    {
        private readonly MyDBContext _context;
        private List<Conversation> conversations;
        private List<Conversation> conversationPrivate;
        public ConversationController(MyDBContext context)
        {
            _context = context;
        }
        public List<Conversation> GetAll()
        {
            return _context.Conversation.ToList();
        }
        public List<Conversation> GetAllByIdUser(int idUser)
        {
            conversations = new List<Conversation>();
            List<GroupMember> groupMembers = _context.GroupMember.Where(g => g.UserId == idUser).ToList();
            foreach (var g in groupMembers)
            {
                conversations.Add(_context.Conversation.SingleOrDefault(c => c.Id == g.ConversationId));
            }
            return conversations;
        }
        public List<Conversation> GetAllPrivateByIdUser(int idUser)
        {
            conversationPrivate = new List<Conversation>();
            List<GroupMember> groupMembers = _context.GroupMember.Where(g => g.UserId == idUser).ToList();
            foreach (var g in groupMembers)
            {
                conversationPrivate.Add(_context.Conversation.SingleOrDefault(c => c.Id == g.ConversationId && c.Group == false));
            }
            return conversationPrivate;
        }
        public void Add(Conversation conversation)
        {
            _context.Conversation.Add(conversation);
            _context.SaveChanges();
        }
    }
}
