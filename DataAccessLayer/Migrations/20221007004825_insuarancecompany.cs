using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class insuarancecompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InsuranceCompany",
                columns: table => new
                {
                    InsuranceCompanyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InsuranceCompanyName = table.Column<string>(nullable: true),
                    Adress = table.Column<string>(nullable: true),
                    Hotline = table.Column<string>(nullable: true),
                    RepresentiveName = table.Column<string>(nullable: true),
                    RepresentiveContact = table.Column<string>(nullable: true),
                    PaysuaranceContactPersonId = table.Column<int>(nullable: false),
                    MouDocument = table.Column<string>(nullable: true),
                    MouDocumentStartDate = table.Column<DateTime>(nullable: false),
                    MouDocumentExpiryDate = table.Column<DateTime>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceCompany", x => x.InsuranceCompanyId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InsuranceCompany");
        }
    }
}
