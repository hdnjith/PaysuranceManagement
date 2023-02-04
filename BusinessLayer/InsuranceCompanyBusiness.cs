using BusinessObjectLayer;
using DataAccessLayer.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Syncfusion.XlsIO;
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class InsuranceCompanyBusiness : IInsuranceCompanyBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
     

        public InsuranceCompanyBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse
          )
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
           
        }
        public  APIResponse GetById(int insuranceCompanyId)
        {
            try
            {
                var claim = _context.InsuranceCompany.Find(insuranceCompanyId);
                APIResponse aPIResponse = new APIResponse();
                if (claim == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "InsuranceCompany unsucessfuly", claim);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "InsuranceCompany sucessfuly", claim);

            }
            catch (Exception ex)
            {

                throw;
            }
          
        }



  
    }
}
