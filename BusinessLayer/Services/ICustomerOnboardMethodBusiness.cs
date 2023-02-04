using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface ICustomerOnboardMethodBusiness
    {
        public Task<APIResponse> AddCustomerOnboardMethod(int cif, string method);
        public Task<APIResponse> SaveCustomerAlt(CustomerBulkUpload customerBulkUpload);
    }
}
