using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using ConsoleAppChat.Models;

namespace ConsoleAppChat.DataType
{
    public class UserDTO
    {
        public UserDTO() {}
        public UserDTO(User user)
        {
            Id = user.Id;
            Name = user.Name;
            UserName = user.UserName;
            Password = user.Password;
            PhoneNumber = user.PhoneNumber;
            Email = user.Email;
        }

        public UserDTO(int id, string name, string userName, string password, string phoneNumber, string email)
        {
            Id = id;
            Name = name;
            UserName = userName;
            Password = password;
            PhoneNumber = phoneNumber;
            Email = email;
        }
        public UserDTO(string name, string userName, string password, string phoneNumber, string email)
        {
            Name = name;
            UserName = userName;
            Password = password;
            PhoneNumber = phoneNumber;
            Email = email;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
