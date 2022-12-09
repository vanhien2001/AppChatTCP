using ConsoleAppChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppChat.Controllers
{
    public class GroupMemberController
    {
        private readonly MyDBContext _context;
        private List<GroupMember> groupMembers = new List<GroupMember>();
        public GroupMemberController(MyDBContext context)
        {
            _context = context;
        }
        public List<GroupMember> GetAll()
        {
            return _context.GroupMember.ToList();
        }
        public List<GroupMember> GetByIdConversation(int id)
        {
            return _context.GroupMember.Where(g => g.ConversationId == id).ToList();
        }
        public GroupMember GetById(int id)
        {
            return _context.GroupMember.SingleOrDefault(u => u.Id == id);
        }
        public void Add(GroupMember groupMember)
        {
            _context.GroupMember.Add(groupMember);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            GroupMember gm = _context.GroupMember.SingleOrDefault(u => u.Id == id);
            _context.Remove(gm);
            _context.SaveChanges();
        }
    }
}
