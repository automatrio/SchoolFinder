using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BingMapsRESTToolkit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolFinder.Common;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BingMapsController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public BingMapsController(IConfiguration configuration) {
            this.configuration = configuration;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string query)
        {
            var request = new GeocodeRequest() 
            {
                BingMapsKey = configuration.GetSection("BingMapsKey").Value,
                Query = query
            };
            var result = await request.Execute();

            if (result.ErrorDetails is not null && result.ErrorDetails.Count() > 0) 
            {
                return BadRequest(result.ErrorDetails);
            }

            var possibleLocations = result.ResourceSets
                .SelectMany(resourceSet => resourceSet.Resources)
                .Cast<Location>()
                .Where(_ => _.Address.Locality == "Porto Alegre")
                .OrderByDescending(_ => _.ConfidenceLevelType);

            var httpResponse = new HttpResponse<Location>()
            {
                Data = possibleLocations,
                Count = possibleLocations.Count(),
            };

            return Ok(httpResponse);
        }

        [HttpGet("get-route")]
        public async Task<IActionResult> GetRoute([FromQuery] double[] coords)
        {
            var request = new RouteRequest();

            request.BingMapsKey = configuration.GetSection("BingMapsKey").Value;
            request.Waypoints = new List<SimpleWaypoint>(2) {
                    new SimpleWaypoint(coords[0], coords[1]),
                    new SimpleWaypoint(coords[2], coords[3])
            };

            var result = await request.Execute();

            var route = result.ResourceSets[0].Resources[0] as Route;

            if (result.ErrorDetails is not null && result.ErrorDetails.Count() > 0) 
            {
                return BadRequest(result.ErrorDetails);
            }

            return Ok(route);
        }
    }
}