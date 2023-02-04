using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BusinessObjectLayer;
using DataAccessLayer.Data;
using BusinessLayer;
//using PaysuranceManagement.Data;

namespace PaysuranceManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PolicyController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly IPolicyBusiness _policyBusiness;
      
        public PolicyController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            IPolicyBusiness policyBusiness, IInsuranceCompanyBusiness insuranceCompanyBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _policyBusiness = policyBusiness;
         
        }


        [HttpPost]
        [Route("Create")]
        public async Task<APIResponse>  Create([FromBody]Policy obj)
        {
            obj.CreatedDate = DateTime.Now;
                _context.Policy.Add(obj);

            using (_context)
            {
                //at each page refresh i would be passing different id to my controller from view.for eg 1,2,3,4
                var data = _context.Policy.Add(obj);
              
                await _context.SaveChangesAsync();
            }

           // await _context.SaveChangesAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy added.",1);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }
        
        
        [HttpPost]
        [Route("PolicyCoverageCreate")]
        public async Task<APIResponse> PolicyCoverageCreate([FromBody]PolicyCoverage obj)
        {

            var list = _context.PolicyCoverage.Where(s => s.PolicyNo == obj.PolicyCoverageType &&  s.PlanId == obj.PlanId).ToList();

            if (list.Count != 0)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), obj.PolicyCoverageType +" policy coverage type alrady added for plan id :" + obj.PlanId, 1);

            }
            obj.CreatedDate = DateTime.Now;
                _context.PolicyCoverage.Add(obj);

            using (_context)
            {
           
                var data = _context.PolicyCoverage.Add(obj);
              
                await _context.SaveChangesAsync();
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy coverage added.", 1);

        }

        [HttpGet]
        [Route("GetAllPolicyModel")]
        public async Task<APIResponse> GetAllPolicyModel(int activeStatusEnum)
        {
          
            return await _policyBusiness.GetAllPolicyModel();
          
        }  
        
        [HttpGet]
        [Route("GetDetailPolicyId")]
        public async Task<APIResponse> GetDetailPolicyId(int policyId)
        {
          
            return await _policyBusiness.GetDetailPolicyId(policyId);
          
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<APIResponse> GetById(int productId)
        {
          
            var claim = await _context.Product.FindAsync(productId);
            APIResponse aPIResponse = new APIResponse();
            if (claim == null)
            {
                return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Claim unsucessfuly", claim);
            }
            return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", claim);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }
        
        [HttpGet]
        [Route("GetPolicyCoverageById")]
        public async Task<APIResponse> GetPolicyCoverageById(int policyCoverageId)
        {
          
            var claim = await _context.PolicyCoverage.FindAsync(policyCoverageId);
            if (claim == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy Coverage unsucessfuly", claim);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy Coverage sucessfuly", claim);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpGet]
        [Route("GetPolicyNo")]
        public async Task<APIResponse> GetPolicyNo()
        {
            var id = await _policyBusiness.GetNextPolicyNo();
           
            if (id == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Plolicy no unsucessfuly", string.Empty);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Plolicy number", id.Data);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }


        [HttpGet]
        [Route("GetPolicyCoverageByPolicyNo")]
        public  APIResponse GetPolicyCoverageByPolicyNo(string policyNo)
        {
            var list =  _context.PolicyCoverage.Where(s => s.PolicyNo == policyNo).ToList();

            if (list == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Plolicy coverage list", string.Empty);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Plolicy coverage list", list);
           
        }
        [HttpGet]
        [Route("GetPolicyCoverageByPolicyNoAndPlanID")]
        public APIResponse GetPolicyCoverageByPolicyNoAndPlanID(string policyNo ,string planId)
        {
            var list = _context.PolicyCoverage.Where(s => s.PolicyNo == policyNo && s.PlanId == planId).ToList();

            if (list == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Plolicy coverage list", string.Empty);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Plolicy coverage list", list);

        }
        [HttpGet]
        [Route("GetPlanId")]
        public async Task<APIResponse> GetPlanId(string policyNo)
        {
            int planid = 0;
            var list =  await (Task < List<PolicyCoverage>>)_context.PolicyCoverage.Where(s => s.PolicyNo == policyNo && s.IsActive == true).ToListAsync();
            if (list.Count != 0)
            {
                int deli = 0;
                foreach (PolicyCoverage i in list)
                {
                  //  deli = Convert.ToInt32(i.PlanId);
                    if (Convert.ToInt32(i.PlanId) > deli)
                    {
                        planid = +Convert.ToInt32(i.PlanId);
                        deli = Convert.ToInt32(i.PlanId);
                    }
                 
                }
            }
            else
            {
                planid = 1;
            }
          
          

            if (planid == 0)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Plan id", planid);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Plan id", planid);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpPost]
        [Route("Update")]
        public async Task<APIResponse> Update([FromBody]Policy obj)
        {

            APIResponse aPIResponse = new APIResponse();
            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ObjExists(obj.PolicyId))
                {
                  //  return NotFound();
                    return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy not found", obj);
                }
                else
                {
                    throw;
                }
            }
            return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy updated", obj);
         //   return NoContent();
        } 
        
        [HttpPost]
        [Route("UpdatePolicyCoverage")]
        public async Task<APIResponse> UpdatePolicyCoverage([FromBody]PolicyCoverage obj)
        {

            APIResponse aPIResponse = new APIResponse();
            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                    return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Policy found", obj);
              
            }
            return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Policy updated", obj);
         //   return NoContent();
        }

        [HttpGet]
        [Route("GetPolicyCoverageDetailAmountsByCif")]
        public async Task<APIResponse> GetPolicyCoverageDetailAmountsByCif(int cif, int policyCoverageId)
        {
            try
            {
                var id = await _policyBusiness.GetPolicyCoverageDetailAmountsByCif( cif,  policyCoverageId);

                if (id == null)
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Plolicy no unsucessfuly", string.Empty);
                }
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Plolicy number", id.Data);
                //return CreatedAtAction(nameof(GetEmployee),
                //       new { id = createdEmployee.EmployeeId }, createdEmployee);

            }
            catch (Exception ex)
            {

                throw;
            }

        }

        private bool ObjExists(int id)
        {
            return _context.Policy.Any(e => e.PolicyId == id);
        }
    }
}
