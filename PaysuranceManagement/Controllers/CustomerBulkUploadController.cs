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
    public class CustomerBulkUploadController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerBulkUploadBusiness _customerBulkUploadBusiness;
        

        public CustomerBulkUploadController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse, ICustomerBulkUploadBusiness customerBulkUploadBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerBulkUploadBusiness = customerBulkUploadBusiness;
        }


    


        [HttpPost]
        [Route("UploadFile")]
       // public async Task<APIResponse> UploadFile([FromForm] FileModel file)
        public async Task<APIResponse> UploadFile([FromForm] FileModel FormFile)
        {
            try
            {
               

                return await _customerBulkUploadBusiness.UploadFile(FormFile);
            }
            catch (Exception ex)
            {

                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Error in customer bulk upload", "");
            }


         
        }

        [HttpGet]
        [Route("GetAllBulkCustomer")]
        public async Task<APIResponse> GetAllBulkCustomer(int activeStatusEnum)
        {
    
                return await _customerBulkUploadBusiness.GetAllBulkCustomer();

        }


        [HttpGet]
        [Route("GetBulkCustomerByCustomerId")]
        public async Task<APIResponse> GetBulkCustomerByCustomerId(int customerId)
        {
    
                return await _customerBulkUploadBusiness.GetBulkCustomerByCustomerId(customerId);

        }


    }
}
