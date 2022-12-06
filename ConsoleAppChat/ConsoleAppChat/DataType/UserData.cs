using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using ConsoleAppChat.Models;

namespace ConsoleAppChat.DataType
{
    public class UserData
    {
        public UserData() {}
        public UserData(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
            Password = user.Password;
            Email = user.Email;
        }

        public UserData(int id, string name, string userName, string password, string email)
        {
            Id = id;
            Name = name;
            UserName = userName;
            Password = password;
            Email = email;
        }
        public UserData(string name, string userName, string password, string email)
        {
            Name = name;
            UserName = userName;
            Password = password;
            Email = email;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
