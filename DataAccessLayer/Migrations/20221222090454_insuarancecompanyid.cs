using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class insuarancecompanyid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InsuaranceCompanyId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "InsuaranceCompanyId",
                table: "Policy");

            migrationBuilder.DropColumn(
                name: "InsuaranceCompanyId",
                table: "Claim");

            migrationBuilder.AddColumn<int>(
                name: "InsuranceCompanyId",
                table: "Product",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InsuranceCompanyId",
                table: "Policy",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InsuranceCompanyId",
                table: "Claim",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InsuranceCompanyId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "InsuranceCompanyId",
                table: "Policy");

            migrationBuilder.DropColumn(
                name: "InsuranceCompanyId",
                table: "Claim");

            migrationBuilder.AddColumn<int>(
                name: "InsuaranceCompanyId",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InsuaranceCompanyId",
                table: "Policy",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InsuaranceCompanyId",
                table: "Claim",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
