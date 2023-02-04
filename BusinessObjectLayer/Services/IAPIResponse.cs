using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessObjectLayer
{
	public interface IAPIResponse
	{
		APIResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dattaHoldDictionary);
		//web
		APIResponse GenerateResponseMessage(string statusCode, string message, object data);

	}
}
