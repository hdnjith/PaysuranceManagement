using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class customerOnboardMethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerOnboardMethod",
                columns: table => new
                {
                    CustomerOnboardMethodId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cif = table.Column<int>(nullable: false),
                    OnboardMethod = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerOnboardMethod", x => x.CustomerOnboardMethodId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerOnboardMethod");
        }
    }
}
