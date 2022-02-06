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
        
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] SchoolFilter filter)
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