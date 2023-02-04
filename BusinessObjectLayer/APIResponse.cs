using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessObjectLayer
{
	public class APIResponse : IAPIResponse
	{
		public string StatusCode  { get; set; }
	public string Message  { get; set; }
	//public string LockedMessage = string.Empty;
	//public string Result { get; set; }
	public object Data { get; set; }

		public APIResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary)
		{
			this.StatusCode = statusCode;
			this.Message = message;
			this.Data = dataHoldDictionary;

			return this;
		}

		public APIResponse GenerateResponseMessage(string statusCode, string message, object data)
		{
			this.StatusCode = statusCode;
			this.Message = message;
			this.Data = data;
			return this;
		}

	
	}
}
