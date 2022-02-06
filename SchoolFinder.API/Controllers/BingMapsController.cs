using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BingMapsRESTToolkit;
using Microsoft.AspNetCore.Mvc;
using SchoolFinder.Common;
using SchoolFinder.Services;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BingMapsController : ControllerBase
    {
        private readonly IBingMapsService bingMapsService;

        public BingMapsController(IBingMapsService bingMapsService) {
            this.bingMapsService = bingMapsService;
        }
        
        /// <summary>
        /// Gets a list with all possible locations found based on the query provided, listed from
        /// most to least likely.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string query)
        {
            return await ConstructHttpResponse(async () => {
                return await this.bingMapsService.GetPossibleLocations(query);
            });
        }

        /// <summary>
        /// Gets a route between two coordinates, origin and destinantion. The expect input is this:
        /// [origin.latitude, origin. longitude, destination.latitude, destination.longitude].
        /// </summary>
        /// <param name="coords"></param>
        /// <returns></returns>
        [HttpGet("get-route")]
        public async Task<IActionResult> GetRoute([FromQuery] double[] coords)
        {
            return await ConstructHttpResponse(async () => {
                return await this.bingMapsService.GetRoute(coords);
            });
        }

        private async Task<ActionResult> ConstructHttpResponse<T>(Func<Task<IEnumerable<T>>> serviceCall)
        {
            var response = new HttpResponse<T>();
            try
            {
                var result = await serviceCall();

                response = new HttpResponse<T>()
                {
                    Data = result,
                    Count = result.Count(),
                    Success = true
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Errors = new List<string>()
                {
                    $"Error at: {this.GetType().Name}",
                    ex.Message,
                };
                return BadRequest(response);
            }
        }
    }
}