using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BusinessObjectLayer;
using DataAccessLayer.Data;
using System.IO;
using BusinessLayer;
//using PaysuranceManagement.Data;

namespace PaysuranceManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileUploadHandlerController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerBulkUploadBusiness _customerBulkUploadBusiness;


        public FileUploadHandlerController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            ICustomerBulkUploadBusiness customerBulkUploadBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerBulkUploadBusiness = customerBulkUploadBusiness;
        }





        [HttpGet]
        [Route("GetUploadResponse")]
        public async Task<APIResponse> GetUploadResponse(string status,string fileName)
        {

            var msg  =   _customerBulkUploadBusiness.GetBulkCustomerUploadStatus(fileName).Result;

            string finalMsg = msg.Data.ToString();
            string finalstatus = msg.StatusCode.ToString();

            if (finalstatus == PayIsuAPIResponseEnum.Error.ToString())
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), finalMsg, finalMsg);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), finalMsg, finalMsg);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }


    }
}
