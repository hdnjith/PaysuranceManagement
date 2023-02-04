using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("ClaimModel")]
	public class ClaimModel
	{

			public CustomerBulkUpload CustomerBulkUpload { get; set; } 
			public Customer Customer { get; set; } 
			public InsuranceCompany InsuranceCompany { get; set; }
			public Policy Policy { get; set; }
			public List<PolicyCoverage> PolicyCoverageList { get; set; }

	}
}
