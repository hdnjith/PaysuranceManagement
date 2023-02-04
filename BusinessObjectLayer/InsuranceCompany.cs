using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("InsuranceCompany")]
	public class InsuranceCompany
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int InsuranceCompanyId { get; set; }
			public string InsuranceCompanyName { get; set; }
			public string Adress { get; set; }
			public string Hotline { get; set; }
			public string RepresentiveName { get; set; }
			public string RepresentiveContact { get; set; }
			public int PaysuaranceContactPersonId { get; set; }
			public string MouDocument { get; set; }
			public DateTime MouDocumentStartDate { get; set; }
			public DateTime MouDocumentExpiryDate { get; set; }
		//	public int ProductId{ get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

		
	}
}
