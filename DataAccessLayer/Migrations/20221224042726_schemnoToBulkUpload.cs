using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class schemnoToBulkUpload : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndorsementType",
                table: "CustomerBulkUpload");

            migrationBuilder.AddColumn<string>(
                name: "SchemeNo",
                table: "CustomerBulkUpload",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SchemeNo",
                table: "CustomerBulkUpload");

            migrationBuilder.AddColumn<string>(
                name: "EndorsementType",
                table: "CustomerBulkUpload",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
