using BusinessObjectLayer;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using Syncfusion.XlsIO;
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class CustomerBusiness : ICustomerBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerOnboardMethodBusiness _customerOnboardMethodBusiness;


        public CustomerBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            ICustomerOnboardMethodBusiness customerOnboardMethodBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerOnboardMethodBusiness = customerOnboardMethodBusiness;
        }
        public APIResponse GetById(int customerId)
        {

            var claim =  _context.Customer.Find(customerId);
            APIResponse aPIResponse = new APIResponse();
            if (claim == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Claim unsucessfuly", claim);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", claim);
   
        }   
        
        public APIResponse GetByCif(int cif)
        {
            try
            {
                Customer customer =  (Customer)_context.Customer.FirstOrDefault(b => b.Cif == cif);

                if (customer == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Customer find by cif unsucessfuly", cif);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Customer find by cif", customer);

            }
            catch (Exception)
            {

                throw;
            }
          
        }
    }
}
