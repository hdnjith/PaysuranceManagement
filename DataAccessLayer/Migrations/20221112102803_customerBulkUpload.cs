using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class customerBulkUpload : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence<int>(
                name: "CustomerIdentificationNumber",
                startValue: 10000L);

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Claim",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SupportiveDocumentLink",
                table: "Claim",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomerBulkUpload",
                columns: table => new
                {
                    CustomerBulkId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cif = table.Column<int>(nullable: false, defaultValueSql: "NEXT VALUE FOR CustomerIdentificationNumber"),
                    FileName = table.Column<string>(nullable: true),
                    SiNo = table.Column<int>(nullable: false),
                    PolicyNo = table.Column<string>(nullable: true),
                    NationalId = table.Column<string>(nullable: true),
                    EpfNo = table.Column<string>(nullable: true),
                    SingleFamilyIdentifier = table.Column<string>(nullable: true),
                    InsuredName = table.Column<string>(nullable: true),
                    Sex = table.Column<string>(nullable: true),
                    Dob = table.Column<DateTime>(nullable: false),
                    Relation = table.Column<string>(nullable: true),
                    InflCoverageType = table.Column<string>(nullable: true),
                    EndorsementType = table.Column<string>(nullable: true),
                    Coverage = table.Column<decimal>(nullable: false),
                    CriticalIllnessAmount = table.Column<decimal>(nullable: false),
                    OpdAmount = table.Column<decimal>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    MobileNumber = table.Column<string>(nullable: true),
                    PolicyStartDate = table.Column<DateTime>(nullable: false),
                    PolicyEndDate = table.Column<DateTime>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    SpecialRemarks = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerBulkUpload", x => x.CustomerBulkId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerBulkUpload");

            migrationBuilder.DropSequence(
                name: "CustomerIdentificationNumber");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Claim");

            migrationBuilder.DropColumn(
                name: "SupportiveDocumentLink",
                table: "Claim");
        }
    }
}
