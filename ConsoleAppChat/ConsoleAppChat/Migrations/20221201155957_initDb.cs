using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleAppChat.Migrations
{
    public partial class initDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "GroupMember",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "IdUserCreate",
                table: "Conversation",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "GroupMember");

            migrationBuilder.DropColumn(
                name: "IdUserCreate",
                table: "Conversation");
        }
    }
}
