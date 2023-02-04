using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("PolicyCoverage")]
	public class PolicyCoverage
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int PolicyCoverageId { get; set; }
			public string PolicyNo { get; set; }
			public string PolicyCoverageType { get; set; }
			public decimal MinAmount { get; set; }
			public decimal MaxAmount { get; set; }
			public string PlanId { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }
		
	}
}
