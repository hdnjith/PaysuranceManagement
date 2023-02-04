using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BusinessObjectLayer;
using DataAccessLayer.Data;
//using PaysuranceManagement.Data;

namespace PaysuranceManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;
        private readonly IAPIResponse _payIsuAPIResponse;


        public ProductController(PaysuranceManagementContext context, IAPIResponse payIsuAPIResponse)
        {
            _context = context;
            _payIsuAPIResponse = payIsuAPIResponse;
        }


        [HttpPost]
        [Route("Create")]
        public async Task<APIResponse>  Create([FromBody]Product obj)
        {
            obj.CreatedDate = DateTime.Now;
                _context.Product.Add(obj);

            using (_context)
            {
                //at each page refresh i would be passing different id to my controller from view.for eg 1,2,3,4
                var data = _context.Product.Add(obj);
              
                await _context.SaveChangesAsync();
            }

           // await _context.SaveChangesAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);

            return _payIsuAPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Insuarance company added.",1);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<APIResponse> GetAll(int activeStatusEnum)
        {
            var list =  await _context.Product.ToListAsync();

            //   var result = await CreatedAtAction("GetClaim", new { id = claim.ClaimId }, claim);
         

            APIResponse aPIResponse = new APIResponse();
           

            return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Claim don sucessfuly", list);
            //return CreatedAtAction(nameof(GetEmployee),
            //       new { id = createdEmployee.EmployeeId }, createdEmployee);

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

        [HttpPost]
        [Route("Update")]
        public async Task<APIResponse> Update([FromBody]Product obj)
        {

            APIResponse aPIResponse = new APIResponse();
            _context.Entry(obj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjExists(obj.ProductId))
                {
                  //  return NotFound();
                    return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Error.ToString(), "Insuarance not found", obj);
                }
                else
                {
                    throw;
                }
            }
            return aPIResponse.GenerateResponseMessage(PayIsuAPIResponseEnum.Success.ToString(), "Insuarance company updated", obj);
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

        private bool ObjExists(int id)
        {
            return _context.Product.Any(e => e.ProductId == id);
        }
    }
}
