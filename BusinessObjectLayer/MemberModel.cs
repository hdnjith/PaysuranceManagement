using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{

	public class MemberModel
	{

		
		public CustomerBulkUpload CustomerBulkUpload { get; set; }
		public Customer Customer { get; set; }
		

		
	}
}
