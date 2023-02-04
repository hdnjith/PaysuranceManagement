using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Policy")]
	public class Policy
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int PolicyId { get; set; }
			public string PolicyType { get; set; }
			public string PolicyName { get; set; }
			public string PolicyDescription { get; set; }
			public int InsuranceCompanyId { get; set; } 
			public string PolicyNo { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }
		
	}
}
