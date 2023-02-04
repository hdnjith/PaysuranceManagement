using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class modifyPolicyMaxAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "MaxAmount",
                table: "PolicyCoverage",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MaxAmount",
                table: "PolicyCoverage",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
