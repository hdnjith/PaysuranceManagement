using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class cifforcustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Cif",
                table: "Customer",
                nullable: false,
                defaultValueSql: "NEXT VALUE FOR CustomerIdentificationNumber",
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Cif",
                table: "Customer",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldDefaultValueSql: "NEXT VALUE FOR CustomerIdentificationNumber");
        }
    }
}
