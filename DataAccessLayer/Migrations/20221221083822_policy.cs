using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class policy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "InsuranceCompany");

            migrationBuilder.CreateSequence<int>(
                name: "PolicyNo",
                startValue: 1000L);

            migrationBuilder.CreateTable(
                name: "Policy",
                columns: table => new
                {
                    PolicyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyType = table.Column<string>(nullable: true),
                    PolicyName = table.Column<string>(nullable: true),
                    PolicyDescription = table.Column<string>(nullable: true),
                    InsuaranceCompanyId = table.Column<int>(nullable: false),
                    PolicyNo = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policy", x => x.PolicyId);
                });

            migrationBuilder.CreateTable(
                name: "PolicyCoverage",
                columns: table => new
                {
                    PolicyCoverageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyNo = table.Column<string>(nullable: true),
                    PolicyCoverageType = table.Column<string>(nullable: true),
                    MinAmount = table.Column<decimal>(nullable: false),
                    MaxAmount = table.Column<int>(nullable: false),
                    PlanId = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyCoverage", x => x.PolicyCoverageId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Policy");

            migrationBuilder.DropTable(
                name: "PolicyCoverage");

            migrationBuilder.DropSequence(
                name: "PolicyNo");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "InsuranceCompany",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
