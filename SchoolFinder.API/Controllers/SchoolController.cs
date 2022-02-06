using Microsoft.AspNetCore.Mvc;
using SchoolFinder.Application;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Data.Filters;
using SchoolFinder.Data.Models;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolController : ControllerBase<School, SchoolDto>
    {
        private readonly IApplicationService<School, SchoolDto> applicationService;

        public SchoolController(IApplicationService<School, SchoolDto> applicationService) : base(applicationService)
        {
            this.applicationService = applicationService;
        }

        /// <summary>
        /// Fetches Schools from this application's database, which is a reflection of DataPOA's one,
        /// the only difference being that text fields have been formatted to better suit visual presentation.
        /// Use "OrderBySmallestDistance" as QueryBehavior to modify the query accordingly.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>
        /// An HttpResponse object.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SchoolFilter filter)
        {
            return await base.GetAll(filter);
        }

        /// <summary>
        /// Retrieves one School with the specified ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        /// An HttpResponse object.
        /// </returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return await base.GetById(id);
        }
    }
}