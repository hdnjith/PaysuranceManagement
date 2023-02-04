using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface ICustomerBulkUploadBusiness
    {
        public Task<APIResponse> UploadFile(FileModel FormFile);
        public Task<APIResponse> GetAllBulkCustomer();
        public Task<APIResponse> GetBulkCustomerByCustomerId(int customerId);
        public Task<APIResponse> GetBulkCustomerUploadStatus(string fileName);

        public APIResponse GetBulkCustomerByCif(int cif);
    }
}
