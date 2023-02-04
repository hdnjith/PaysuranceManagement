using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Ailment")]
	public class Ailment
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int AilmentId { get; set; }
			public string AilmentName { get; set; }
			public string AilmentDescription { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

		
	}
}
