using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class modifyclaim : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ClaimRef",
                table: "Claim",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR ClaimNumber",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValueSql: "NEXT VALUE FOR ClaimNumber");

            migrationBuilder.AddColumn<string>(
                name: "ClaimRefAlter",
                table: "Claim",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClaimRefAlter",
                table: "Claim");

            migrationBuilder.AlterColumn<string>(
                name: "ClaimRef",
                table: "Claim",
                type: "nvarchar(max)",
                nullable: true,
                defaultValueSql: "NEXT VALUE FOR ClaimNumber",
                oldClrType: typeof(int),
                oldDefaultValueSql: "NEXT VALUE FOR ClaimNumber");
        }
    }
}
