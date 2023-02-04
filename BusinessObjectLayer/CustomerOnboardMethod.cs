using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("CustomerOnboardMethod")]
	public class CustomerOnboardMethod
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int CustomerOnboardMethodId { get; set; }
		public int Cif { get; set; }
		public string OnboardMethod { get; set; }
		
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

		
	}
}
