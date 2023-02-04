using BusinessObjectLayer;
using DataAccessLayer.Data;
using Syncfusion.XlsIO;
using System;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class ClaimBusiness : IClaimBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerOnboardMethodBusiness _customerOnboardMethodBusiness;
        private readonly ICustomerBusiness _customerBusiness;
        private readonly ICustomerBulkUploadBusiness _customerBulkUploadBusiness;
        private readonly IInsuranceCompanyBusiness _insuranceCompanyBusiness;
        private readonly IPolicyBusiness _policyBusiness;


        public ClaimBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            ICustomerOnboardMethodBusiness customerOnboardMethodBusiness, ICustomerBusiness customerBusiness,
            ICustomerBulkUploadBusiness customerBulkUploadBusiness,
            IInsuranceCompanyBusiness insuranceCompanyBusiness,
            IPolicyBusiness policyBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerOnboardMethodBusiness = customerOnboardMethodBusiness;
            _customerBusiness = customerBusiness;
            _customerBulkUploadBusiness = customerBulkUploadBusiness;
            _insuranceCompanyBusiness = insuranceCompanyBusiness;
            _policyBusiness = policyBusiness;
        }

        public APIResponse GetCustomerByCif(int cif)
        {
            try
            {
                //string custype = CheckCustomerType(cif);
                string custype = "B";

                if (custype == "I")
                {
                    Customer obj = (Customer)_customerBusiness.GetByCif(cif).Data;
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "customer load succesful", obj);

                }
                else if (custype == "B")
                {
                    CustomerBulkUpload obj = (CustomerBulkUpload)_customerBulkUploadBusiness.GetBulkCustomerByCif(cif).Data;
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "customer load succesful", obj);

                }
                else if (custype == "X")
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Fatal occured.", 1);
                }
                else
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Fatal occured.", 1);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "customer load succesful", 1);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public APIResponse GetPreClaimDetailByCif(int cif)
         {
            ClaimModel claimModel = new ClaimModel();
            if (cif > 0)
            {
                CustomerBulkUpload obj = (CustomerBulkUpload)_customerBulkUploadBusiness.GetBulkCustomerByCif(cif).Data;
                Customer customer =  (Customer)_customerBusiness.GetById(obj.parentCustomerId).Data;
                PolicyModel policyModel =  (PolicyModel)_policyBusiness.GetDetailPolicyNo(obj.PolicyNo).Data;
                InsuranceCompany insuranceCompany = (InsuranceCompany)_insuranceCompanyBusiness.GetById(customer.InsuranceCompanyId).Data;
              
                claimModel.CustomerBulkUpload = obj; 
                claimModel.Customer = customer;
                claimModel.InsuranceCompany = insuranceCompany;
                claimModel.Policy = policyModel.Policy;
                claimModel.PolicyCoverageList = policyModel.PolicyCoverageList;

                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim load succesfuly", claimModel);

            }
            else
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Invalid Claim", claimModel);

            }
        }

        private string  CheckCustomerType (int  id)
        {
            bool IsIndividual;
            bool isBulk;
            string custype = "NA";
            try
            {
                if (id > 0)
                {
                    IsIndividual = IsIndividualCustomer(id);
                    isBulk = IsBulkCustomer(id);
                    if (IsIndividual)
                    {
                        custype = "I";
                    }
                    if (isBulk)
                    {
                        custype = "B";
                    }
                    if (isBulk == true && IsIndividual == true)
                    {
                        custype = "X";
                    }
                }
                else
                {
                    
                }
                return custype;
            }
            catch (Exception ex)
            {

                return null;
            }



        }

        private bool IsBulkCustomer(int id)
        {
            return _context.CustomerBulkUpload.Any(e => e.Cif == id);
        }

        private bool IsIndividualCustomer(int id)
        {
            return _context.Customer.Any(e => e.Cif == id);
        }
    }
}
