using Microsoft.EntityFrameworkCore;
using ConsoleAppChat.Models;
using Microsoft.VisualBasic;

namespace ConsoleAppChat.Models
{
#pragma warning disable cs1591
    public class MyDBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=LENOVO_L340\\HKPM;Database=AppChat;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");
        }
        public DbSet<User> User { get; set; } = null!;
        public DbSet<Conversation> Conversation { get; set; } = null!;
        public DbSet<GroupMember> GroupMember { get; set; } = null!;
        public DbSet<Message> Message { get; set; } = null!;

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    //base.OnModelCreating(builder);
        //    //builder.Entity<TodoItem>().HasData(
        //    //    new TodoItem { Id = 1, Name = "Item #1", IsComplete = true },
        //    //    new TodoItem { Id = 2, Name = "Item #2", IsComplete = true },
        //    //    new TodoItem { Id = 3, Name = "Item #3", IsComplete = true }
        //    //    );
        //}
    }


#pragma warning disable cs1591
}
