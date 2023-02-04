using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class customer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    CustomerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(nullable: true),
                    CustomerType = table.Column<string>(nullable: true),
                    IdentificationNo = table.Column<string>(nullable: true),
                    Adress = table.Column<string>(nullable: true),
                    Contact = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    EmergencyContactName = table.Column<string>(nullable: true),
                    EmergencyContactNumber = table.Column<string>(nullable: true),
                    InsuaranceCompanyId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    CustomerSheet = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.CustomerId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
