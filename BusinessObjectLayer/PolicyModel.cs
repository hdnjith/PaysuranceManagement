using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("PolicyModel")]
	public class PolicyModel
	{

		
			
			public string InsuaranceCompanyName { get; set; } 
			public Policy Policy { get; set; }
			public List<PolicyCoverage> PolicyCoverageList { get; set; }
			
		
	}
}
