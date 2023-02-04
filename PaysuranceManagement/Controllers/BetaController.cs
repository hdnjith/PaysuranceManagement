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
    public class BetaController : ControllerBase
    {
       private readonly PaysuranceManagementContext _context;

        public BetaController(PaysuranceManagementContext context)
        {
            _context = context;
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

        //private bool ClaimExists(int id)
        //{
        //    return _context.Claim.Any(e => e.ClaimId == id);
        //}
    }
}
