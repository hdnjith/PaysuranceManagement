using BusinessObjectLayer;
using DataAccessLayer.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Syncfusion.XlsIO;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class PolicyBusiness : IPolicyBusiness
    {

        private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly IInsuranceCompanyBusiness _insuranceCompanyBusiness;
     

        public PolicyBusiness(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            IInsuranceCompanyBusiness insuranceCompanyBusiness
          )
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _insuranceCompanyBusiness = insuranceCompanyBusiness;
           
        }

        public  async Task<APIResponse> GetAllPolicyModel()
        {
            var list = await _context.Policy.ToListAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);

            List<PolicyModel> policyModelList = new List<PolicyModel>();

            foreach (Policy i in list)
            {
                PolicyModel policyModel = new PolicyModel();

                policyModel.Policy = i;
                if (i.InsuranceCompanyId > 0)
                {
                    InsuranceCompany model = (InsuranceCompany)_insuranceCompanyBusiness.GetById(i.InsuranceCompanyId).Data;
                    policyModel.InsuaranceCompanyName = model.InsuranceCompanyName;
                }
                else
                {
                    policyModel.InsuaranceCompanyName = string.Empty;
                }
             
                policyModelList.Add(policyModel);
            }

            if (policyModelList == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy model unsucessfuly", policyModelList);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy model sucessfuly", policyModelList);

        }

        public async Task<APIResponse> GetById(int customerId)
        {

            var claim = await _context.Customer.FindAsync(customerId);
            APIResponse aPIResponse = new APIResponse();
            if (claim == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Claim unsucessfuly", claim);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", claim);
   
        }

        public async Task<APIResponse> GetDetailPolicyId(int policyId)
        {
            try
            {

                var policy = await _context.Policy.FindAsync(policyId);
              
               // var list = await _context.Policy.ToListAsync();

                var list = _context.PolicyCoverage.Where(s => s.PolicyNo == policy.PolicyNo).ToList();

                PolicyModel PolicyModel = new PolicyModel();
                PolicyModel.Policy = policy;
                PolicyModel.PolicyCoverageList = list;
                //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);


                if (PolicyModel == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy model unsucessfuly", PolicyModel);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy model sucessfuly", PolicyModel);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public APIResponse GetDetailPolicyNo(string policyNo)
        {
            try
            {

                var policy = _context.Policy.FirstOrDefault(b => b.PolicyNo == policyNo);


                // var list = await _context.Policy.ToListAsync();

                var list = _context.PolicyCoverage.Where(s => s.PolicyNo == policy.PolicyNo).ToList();

                PolicyModel PolicyModel = new PolicyModel();
                PolicyModel.Policy = policy;
                PolicyModel.PolicyCoverageList = list;
                //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);


                if (PolicyModel == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy model unsucessfuly", PolicyModel);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy model sucessfuly", PolicyModel);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public  async Task<APIResponse> GetDetailPolicyNoAsync(string policyNo)
        {
            try
            {
      
                var policy =  _context.Policy.FirstOrDefault(b => b.PolicyNo == policyNo);


                // var list = await _context.Policy.ToListAsync();

                var list = _context.PolicyCoverage.Where(s => s.PolicyNo == policy.PolicyNo).ToList();

                PolicyModel PolicyModel = new PolicyModel();
                PolicyModel.Policy = policy;
                PolicyModel.PolicyCoverageList = list;
                //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);


                if (PolicyModel == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy model unsucessfuly", PolicyModel);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy model sucessfuly", PolicyModel);

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<APIResponse> GetNextPolicyNo()
        {
            int anInt;
            var connection = _context.Database.GetDbConnection();
            connection.Open();
            using (var cmd = connection.CreateCommand())
            {
                cmd.CommandText = "SELECT NEXT VALUE FOR dbo.PolicyNo;";
                var obj = cmd.ExecuteScalar();
                 anInt = (int)obj;
            }
           
           
        
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", anInt);

        }

        public async Task<APIResponse> GetPolicyCoverageDetailAmountsByCif(int cif, int policyCoverageId)
        {
            try
            {
             
                var policyCoverageMaxAMount = await _context.PolicyCoverage.Where(s => s.PolicyCoverageId == policyCoverageId).FirstOrDefaultAsync();
                // var list = await _context.Policy.ToListAsync();

                var alreadyUtilizedAmount = await _context.Claim.Where(s => s.Cif == cif && s.IsActive == true).SumAsync(i => i.AmountDeducted);
                
                
                IDictionary<string, decimal> amounts = new Dictionary<string, decimal>();
                amounts.Add("policyCoverageMaxAMount", policyCoverageMaxAMount.MaxAmount); //adding a key/value using the Add() method
                amounts.Add("alreadyUtilizedAmount", Convert.ToDecimal(alreadyUtilizedAmount));
              
                if (amounts == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy amounts unsucessfuly", amounts);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy amounts sucessfuly", amounts);

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
