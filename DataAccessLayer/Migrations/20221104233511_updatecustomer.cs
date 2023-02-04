using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class updatecustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InsuaranceCompanyId",
                table: "Customer");

            migrationBuilder.AddColumn<int>(
                name: "InsuranceCompanyId",
                table: "Customer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InsuranceCompanyId",
                table: "Customer");

            migrationBuilder.AddColumn<int>(
                name: "InsuaranceCompanyId",
                table: "Customer",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
