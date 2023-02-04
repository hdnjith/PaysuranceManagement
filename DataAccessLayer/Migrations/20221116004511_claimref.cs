using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class claimref : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoperateId",
                table: "Claim");

            migrationBuilder.CreateSequence<int>(
                name: "ClaimNumber",
                startValue: 1000L);

            migrationBuilder.AddColumn<int>(
                name: "Cif",
                table: "Customer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "ClaimRef",
                table: "Claim",
                nullable: true,
                defaultValueSql: "NEXT VALUE FOR ClaimNumber",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cif",
                table: "Claim",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Claim",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "ClaimNumber");

            migrationBuilder.DropColumn(
                name: "Cif",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "Cif",
                table: "Claim");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Claim");

            migrationBuilder.AlterColumn<string>(
                name: "ClaimRef",
                table: "Claim",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true,
                oldDefaultValueSql: "NEXT VALUE FOR ClaimNumber");

            migrationBuilder.AddColumn<int>(
                name: "CoperateId",
                table: "Claim",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
