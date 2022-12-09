using ConsoleAppChat.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsoleAppChat.Controllers
{
    internal class UserController
    {
        private readonly MyDBContext _context;
        public UserController(MyDBContext context)
        {
            _context = context;
        }
        public List<User> GetAll()
        {
            return _context.User.ToList();
        }
        public User GetById(int id)
        {
            return _context.User.SingleOrDefault( u => u.Id == id);
        }
        public void Add(User user)
        {
            _context.User.Add(user);
            _context.SaveChanges();
        }
        public void Update(User userInfor)
        {
            User user = _context.User.SingleOrDefault(u => u.Id == userInfor.Id);
            user.PhoneNumber = userInfor.PhoneNumber;
            user.Email = userInfor.Email;
            user.Name= userInfor.Name;
            _context.SaveChanges();
        }
    }
}
