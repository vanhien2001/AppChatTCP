
using System.ComponentModel.DataAnnotations;

namespace ConsoleAppChat.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? UserName { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? Email { get; set; }
    }
}
