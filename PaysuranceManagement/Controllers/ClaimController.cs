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
    public class ClaimController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly IClaimBusiness _claimBusiness;
        private readonly IInsuranceCompanyBusiness _insuranceCompanyBusiness;
        private readonly IPolicyBusiness _policyBusiness;
        public ClaimController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            IClaimBusiness claimBusiness, IInsuranceCompanyBusiness insuranceCompanyBusiness, IPolicyBusiness policyBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _claimBusiness = claimBusiness;
            _insuranceCompanyBusiness = insuranceCompanyBusiness;
            _policyBusiness = policyBusiness;
        }


        [HttpPost]
        [Route("SaveBeta")]
        public async Task<APIResponse>  SaveBranch([FromBody]Claim claim)
        {
            claim.CreatedDate = DateTime.Now;
                _context.Claim.Add(claim);

            using (_context)
            {
                //at each page refresh i would be passing different id to my controller from view.for eg 1,2,3,4
                var data = _context.Claim.Add(claim);
              
                await _context.SaveChangesAsync();
            }

           // await _context.SaveChangesAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
            APIResponse aPIResponse2 = new APIResponse();
            aPIResponse2.StatusCode = "Success";
            aPIResponse2.Message = "Successsdfffffffffffffsssssssssssssssssssssssssssss";
            aPIResponse2.Data = 3;

            APIResponse aPIResponse = new APIResponse();
            aPIResponse.StatusCode = "Success";
            aPIResponse.Message = "Successsdfffffffffffffsssssssssssssssssssssssssssss";
            aPIResponse.Data = aPIResponse2;

            return aPIResponse.GenerateResponseMessage("Success", "Claim don sucessfuly",1);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpGet]
        [Route("GetAllBeta")]
        public async Task<APIResponse> GetAllBeta(int activeStatusEnum)
        {
            var list =  await _context.Claim.ToListAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
         

            APIResponse aPIResponse = new APIResponse();
           

            return aPIResponse.GenerateResponseMessage("Success", "Claim done sucessfuly", list);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }


        [HttpGet]
        [Route("GetCustomerByCif")]
        public APIResponse GetCustomerByCif(int cif)
        {
            try
            {
                if (cif > 0)
                {
                    CustomerBulkUpload obj = (CustomerBulkUpload)_claimBusiness.GetCustomerByCif(cif).Data;

                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Customer load.", obj);

                }
                else
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Invalid cif id", cif);

                }
            }
            catch (Exception ex)
            {

                throw;
            }
           

        }
        
        [HttpGet]
        [Route("GetPreClaimDetailByCif")]
        public APIResponse GetPreClaimDetailByCif(int cif)
        {
            try
            {
              
                if (cif > 0)
                {
                    ClaimModel obj = (ClaimModel)_claimBusiness.GetPreClaimDetailByCif(cif).Data;
            

                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim load.", obj);

                }
                else
                {
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Invalid claim", string.Empty);

                }
            }
            catch (Exception ex)
            {

                throw;
            }
           

        }

    }
}
