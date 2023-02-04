using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class hospital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    HospitalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Hotline = table.Column<string>(nullable: true),
                    RepresentiveName = table.Column<string>(nullable: true),
                    RepresentiveContact = table.Column<string>(nullable: true),
                    PaysuaranceContactPersonId = table.Column<int>(nullable: false),
                    MouDocument = table.Column<string>(nullable: true),
                    MouDocumentStartDate = table.Column<DateTime>(nullable: false),
                    MouDocumentExpiryDate = table.Column<DateTime>(nullable: false),
                    ScannedCopyOfMouPath = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospital", x => x.HospitalId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hospital");
        }
    }
}
