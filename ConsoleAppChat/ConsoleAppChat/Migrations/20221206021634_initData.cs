using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleAppChat.Migrations
{
    public partial class initData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "GroupMember");

            migrationBuilder.AddColumn<DateTime>(
                name: "date",
                table: "GroupMember",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "dateCreate",
                table: "Conversation",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "date",
                table: "GroupMember");

            migrationBuilder.DropColumn(
                name: "dateCreate",
                table: "Conversation");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "GroupMember",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
