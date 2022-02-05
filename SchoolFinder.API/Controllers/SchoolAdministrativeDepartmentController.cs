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

        
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SchoolAdministrativeDepartmentFilter filter)
        {
            return await base.GetAll(filter);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return await base.GetById(id);
        }
    }
}