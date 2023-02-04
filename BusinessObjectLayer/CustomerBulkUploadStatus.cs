using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{
	[Table("CustomerBulkUploadStatus")]
	public class CustomerBulkUploadStatus
	{

			[Key]
			[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
			public int CustomerBulkUploadStatusId { get; set; }
			public int CustomerBulkId { get; set; }
			public string FileName { get; set; }
			public int RowId { get; set; }
			public string Status { get; set; }
			public string Reason { get; set; }	
			public int CreatedBy { get; set; }
			public DateTime CreatedDate { get; set; }
			public int? ModifiedBy { get; set; }
			public DateTime? ModifiedDate { get; set; }
			public bool IsActive { get; set; }

	}
}
