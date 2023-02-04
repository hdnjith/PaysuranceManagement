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
    public class CustomerController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;
        private readonly ICustomerOnboardMethodBusiness _customerOnboardMethodBusiness;


        public CustomerController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse,
            ICustomerOnboardMethodBusiness customerOnboardMethodBusiness)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
            _customerOnboardMethodBusiness = customerOnboardMethodBusiness;
        }


        [HttpPost]
        [Route("Create")]
        public async Task<APIResponse>  Create([FromBody]Customer claim)
        {
            claim.CreatedDate = DateTime.Now;
                _context.Customer.Add(claim);

            using (_context)
            {
                //at each page refresh i would be passing different id to my controller from view.for eg 1,2,3,4
                var data = _context.Customer.Add(claim);
              
                await _context.SaveChangesAsync();

                await _customerOnboardMethodBusiness.AddCustomerOnboardMethod(claim.Cif, "I");
            }

           // await _context.SaveChangesAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Customer added.",1);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<APIResponse> GetAll(int activeStatusEnum)
        {
            var list =  await _context.Customer.ToListAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
         

            APIResponse aPIResponse = new APIResponse();
           

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "list all sucessfuly", list);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpGet]
        [Route("GetById")]
        public async Task<APIResponse> GetById(int customerId)
        {
          
            var claim = await _context.Customer.FindAsync(customerId);
            APIResponse aPIResponse = new APIResponse();
            if (claim == null)
            {
                return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Claim unsucessfuly", claim);
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", claim);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpPost]
        [Route("Update")]
        public async Task<APIResponse> Update([FromBody]Customer customer)
        {

            APIResponse aPIResponse = new APIResponse();
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EntityExists(customer.CustomerId))
                {
                  //  return NotFound();
                    return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "customer not found", customer);
                }
                else
                {
                    throw;
                }
            }
            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "customer updated", customer);
         //   return NoContent();
        }


        // GET: api/Beta
        // [HttpGet]
        //public async Task<ActionResult<IEnumerable<Claim>>> GetClaim()
        //{
        //    return await _context.Claim.ToListAsync();
        //}

        //// GET: api/Beta/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Claim>> GetClaim(int id)
        //{
        //    var claim = await _context.Claim.FindAsync(id);

        //    if (claim == null)
        //    {
        //        return NotFound();
        //    }

        //    return claim;
        //}

        //// PUT: api/Beta/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutClaim(int id, Claim claim)
        //{
        //    if (id != claim.ClaimId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(claim).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ClaimExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Beta
        //// To protect from overposting attacks, enable the specific properties you want to bind to, for
        //// more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Claim>> PostClaim(Claim claim)
        //{
        //    _context.Claim.Add(claim);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
        //}

        //// DELETE: api/Beta/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Claim>> DeleteClaim(int id)
        //{
        //    var claim = await _context.Claim.FindAsync(id);
        //    if (claim == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Claim.Remove(claim);
        //    await _context.SaveChangesAsync();

        //    return claim;
        //}

        private bool EntityExists(int id)
        {
            return _context.Customer.Any(e => e.CustomerId == id);
        }

        private async Task<int> GetCif(int id)
        {
            var cust =   _context.Customer.FindAsync(id);

            Customer customer = await _context.Customer.FindAsync(id);

            return customer.Cif;

         
        }
    }
}
