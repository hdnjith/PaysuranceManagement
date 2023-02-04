using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Product")]
	public class Product
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int ProductId { get; set; }
			public string ProductType { get; set; }
			public string ProductName { get; set; }
			public string ProductDescription { get; set; }
			public int InsuranceCompanyId { get; set; }
			public string PolicyNo { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }
		
	}
}
