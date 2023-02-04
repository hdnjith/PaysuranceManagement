using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("Hospital")]
	public class Hospital
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int HospitalId { get; set; }
			public string HospitalName { get; set; }
			public string Location { get; set; }
			public string Address { get; set; }
			public string Email { get; set; }
			public string Hotline { get; set; }
			public string RepresentiveName { get; set; }
			public string RepresentiveContact { get; set; }
			public int PaysuaranceContactPersonId { get; set; }
		public string MouDocument { get; set; }
		public DateTime MouDocumentStartDate { get; set; }
		public DateTime MouDocumentExpiryDate { get; set; }
	//	public byte[] ScannedCopyOfMou { get; set; }
		//public IFormFile ScannedCopyOfMou { get; set; }
		public string ScannedCopyOfMouPath { get; set; }
		public int CreatedBy { get; set; }
		public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }
		
	}
}
