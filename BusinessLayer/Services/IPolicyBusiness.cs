using BusinessObjectLayer;
using System;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public interface IPolicyBusiness
    {
        public Task<APIResponse> GetNextPolicyNo();
        public Task<APIResponse> GetAllPolicyModel();
        public Task<APIResponse> GetDetailPolicyId(int policyId);
        public Task<APIResponse> GetDetailPolicyNoAsync(string policyNo);
        public APIResponse GetDetailPolicyNo(string policyNo);
        public Task<APIResponse> GetPolicyCoverageDetailAmountsByCif(int cif, int policyCoverageId);

    }
}
