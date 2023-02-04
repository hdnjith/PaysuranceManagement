using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Customer")]
	public class Customer
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int CustomerId { get; set; }
		public int Cif { get; set; }
		public string CustomerName { get; set; }
			public string CustomerType { get; set; }
			public string IdentificationNo { get; set; }
			public string Adress { get; set; }
			public string Contact { get; set; }
			public string Email { get; set; }
			public string EmergencyContactName { get; set; }
			public string EmergencyContactNumber { get; set; }
			public int InsuranceCompanyId { get; set; }
			public int ProductId { get; set; }
			public string CustomerSheet { get; set; }
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

		
	}
}
