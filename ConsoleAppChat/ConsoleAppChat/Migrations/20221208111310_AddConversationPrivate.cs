using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleAppChat.Migrations
{
    public partial class AddConversationPrivate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Conversation");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Group",
                table: "Conversation",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
