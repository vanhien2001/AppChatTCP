﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleAppChat.Migrations
{
    public partial class removeConversationPrivate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConversationPrivate");

            migrationBuilder.AddColumn<bool>(
                name: "Group",
                table: "Conversation",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "Conversation");

            migrationBuilder.CreateTable(
                name: "ConversationPrivate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser1 = table.Column<int>(type: "int", nullable: false),
                    IdUser2 = table.Column<int>(type: "int", nullable: false),
                    dateCreate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConversationPrivate", x => x.Id);
                });
        }
    }
}
