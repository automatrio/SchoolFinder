using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BingMapsRESTToolkit;
using Microsoft.AspNetCore.Mvc;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BingMapsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string query)
        {
            var request = new GeocodeRequest() 
            {
                BingMapsKey = "AsXAoIWVfDyZeUDnGvxgkXdyJVE7-KWFeu2g2Kc1YiHnUsLCmLoX3myVPJS4UdAp",
                Query = query
            };
            var result = await request.Execute();

            if (result.ErrorDetails is not null && result.ErrorDetails.Count() > 0) 
            {
                return BadRequest(result.ErrorDetails);
            }

            var possibleLocations = result.ResourceSets[0].Resources
                .Cast<Location>()
                .Where(_ => _.Address.Locality == "Porto Alegre")
                .OrderByDescending(_ => _.ConfidenceLevelType);

            return Ok(possibleLocations);
        }
    }
}