using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class firstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Claim",
                columns: table => new
                {
                    ClaimId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClaimRef = table.Column<string>(nullable: true),
                    InsuaranceCompanyId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    CoperateId = table.Column<int>(nullable: false),
                    PolicyId = table.Column<int>(nullable: false),
                    HospitalId = table.Column<int>(nullable: false),
                    AilmentId = table.Column<int>(nullable: false),
                    DateOfAdmission = table.Column<DateTime>(nullable: false),
                    DateOfDischarge = table.Column<DateTime>(nullable: false),
                    AmountClaimed = table.Column<double>(nullable: false),
                    AmountDeducted = table.Column<double>(nullable: false),
                    AmountSettled = table.Column<double>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Claim", x => x.ClaimId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Claim");
        }
    }
}
