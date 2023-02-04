using BusinessObjectLayer;
using DataAccessLayer.Data;
using Syncfusion.XlsIO;
using System;
using System.Globalization;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class CustomerOnboardMethodBusiness : ICustomerOnboardMethodBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;


        public CustomerOnboardMethodBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
        }
     
        public async Task<APIResponse> AddCustomerOnboardMethod(int cif,string method)
        {
            try
            {
                CustomerOnboardMethod claim = new CustomerOnboardMethod();
                claim.CreatedDate = DateTime.Now;
                claim.Cif = cif;
                claim.OnboardMethod = method;

             //   _context.CustomerOnboardMethod.Add(claim);

                using (_context)
                {
                    //at each page refresh i would be passing different id to my controller from view.for eg 1,2,3,4
                    var data = _context.CustomerOnboardMethod.Add(claim);

                    await _context.SaveChangesAsync();
                }

                // await _context.SaveChangesAsync();

                //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);

                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Onboard Method added.", 1);

            }
            catch (Exception ex)
            {

                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Error", "");

            }
        }

        public async Task<APIResponse> SaveCustomerAlt(CustomerBulkUpload customerBulkUpload)
        {
            try
            {
                var data = await _context.CustomerBulkUpload.AddAsync(customerBulkUpload);

                await _context.SaveChangesAsync();
                CustomerBulkUploadStatus customerBulkUploadStatus = new CustomerBulkUploadStatus();
                customerBulkUploadStatus.CustomerBulkId = customerBulkUpload.CustomerBulkId;
                customerBulkUploadStatus.FileName = customerBulkUpload.FileName;
                customerBulkUploadStatus.Reason = customerBulkUpload.Cif + " Onboarded successfully.";
                customerBulkUploadStatus.RowId = customerBulkUpload.SiNo;
                customerBulkUploadStatus.Status = PayIsuAPIResponseEnum.Success.ToString();
                customerBulkUploadStatus.CreatedBy = 1;
                customerBulkUploadStatus.CreatedDate = DateTime.Now;
                customerBulkUploadStatus.IsActive = true;

                var data1 = _context.CustomerBulkUploadStatus.Add(customerBulkUploadStatus);

                await _context.SaveChangesAsync();

                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "SaveCustomerAlt", 1);
            }
            catch (Exception ex)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "SaveCustomerAlt", 0);
                throw;
            }
        }
    }
}
