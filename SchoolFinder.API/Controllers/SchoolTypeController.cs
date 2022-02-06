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
    public class SchoolTypeController : ControllerBase<SchoolType, SchoolTypeDto>
    {
        private readonly IApplicationService<SchoolType, SchoolTypeDto> applicationService;

        public SchoolTypeController(IApplicationService<SchoolType, SchoolTypeDto> applicationService) : base(applicationService)
        {
            this.applicationService = applicationService;
        }

        /// <summary>
        /// Retrieves all SchoolTypes or only those specified by its filter's parameters.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>
        /// An HttpResponse object.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SchoolTypeFilter filter)
        {
            return await base.GetAll(filter);
        }

        /// <summary>
        /// Fetches one SchoolType designated by the ID parameter.
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