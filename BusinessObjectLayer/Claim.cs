using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Claim")]
	public class Claim
    {

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int ClaimId { get; set; }
			public int ClaimRef { get; set; }
			public string ClaimRefAlter { get; set; }
			public int Cif { get; set; }
			public int InsuranceCompanyId { get; set; }
			public string ClaimType { get; set; }
			public int ProductId { get; set; }
			public int PolicyId { get; set; }
			public int HospitalId { get; set; }
			public int AilmentId { get; set; }
			public int CustomerId { get; set; }
			public string SupportiveDocumentLink { get; set; }
			public DateTime DateOfAdmission{ get; set; }
			public DateTime DateOfDischarge{ get; set; }
			public double AmountClaimed{ get; set; }
			public double AmountDeducted{ get; set; }
			public double AmountSettled{ get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

		
	}
}
