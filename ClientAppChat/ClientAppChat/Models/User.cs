using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace ClientAppChat.Models
{
    public class User
    {
        public User() { }
        public User(int id, string name, string userName, string password, string phoneNumber, string email)
        {
            this.Id = id;
            this.Name = name;
            this.UserName = userName;
            this.Password = password;
            this.PhoneNumber = phoneNumber;
            this.Email = email;
        }
        public User(string name, string userName, string password, string phoneNumber, string email)
        {
            this.Name = name;
            this.UserName = userName;
            this.Password = password;
            this.PhoneNumber = phoneNumber;
            this.Email = email;
        }
        public User(string userName, string password)
        {
            this.UserName = userName;
            this.Password = password;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
    }
}
