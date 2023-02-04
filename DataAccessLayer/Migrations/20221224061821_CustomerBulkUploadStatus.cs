using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class CustomerBulkUploadStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerBulkUploadStatus",
                columns: table => new
                {
                    CustomerBulkUploadStatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerBulkId = table.Column<int>(nullable: false),
                    FileName = table.Column<string>(nullable: true),
                    RowId = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    Reason = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerBulkUploadStatus", x => x.CustomerBulkUploadStatusId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerBulkUploadStatus");
        }
    }
}
