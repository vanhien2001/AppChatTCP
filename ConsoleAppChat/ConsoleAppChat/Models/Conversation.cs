using System.ComponentModel.DataAnnotations;

namespace ConsoleAppChat.Models
{
    public class Conversation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int IdUserCreate { get; set; }

        [Required]
        public Boolean Group { get; set; }

        [Required]
        public DateTime dateCreate { get; set; }
    }
}
