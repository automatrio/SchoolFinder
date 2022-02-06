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
    public class SchoolAdministrativeDepartmentController : ControllerBase<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto>
    {
        private readonly IApplicationService<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto> applicationService;

        public SchoolAdministrativeDepartmentController(IApplicationService<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto> applicationService) : base(applicationService)
        {
            this.applicationService = applicationService;
        }


        /// <summary>
        /// Retrieves all SchoolAdministrativeDepartments or only those specified by its filter's parameters.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns>
        /// An HttpResponse object.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SchoolAdministrativeDepartmentFilter filter)
        {
            return await base.GetAll(filter);
        }

        /// <summary>
        /// Fetches one SchoolAdministrativeDepartment designated by the ID parameter.
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