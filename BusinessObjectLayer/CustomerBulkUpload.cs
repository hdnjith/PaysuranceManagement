using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("CustomerBulkUpload")]
	public class CustomerBulkUpload
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int CustomerBulkId { get; set; }
			public int parentCustomerId { get; set; }
			public int Cif { get; set; }
			public string FileName { get; set; }
			public int SiNo { get; set; }
			public string PolicyNo { get; set; }
			public string NationalId { get; set; }
			public string EpfNo { get; set; }
			public string SingleFamilyIdentifier { get; set; }
			public string InsuredName { get; set; }
			public string Sex { get; set; }
			public DateTime? Dob { get; set; }
			public string Relation { get; set; }
			public string InflCoverageType { get; set; }
			public string SchemeNo { get; set; }
			public decimal Coverage { get; set; }
			public decimal CriticalIllnessAmount { get; set; }
			public decimal OpdAmount { get; set; }
			public string Email { get; set; }
			public string MobileNumber { get; set; }
			public DateTime? PolicyStartDate { get; set; }
			public DateTime? PolicyEndDate { get; set; }
			public DateTime? EffectiveDate { get; set; }
			public string SpecialRemarks { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

	

	}
}
