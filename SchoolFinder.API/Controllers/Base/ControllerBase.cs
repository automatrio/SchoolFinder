using Microsoft.AspNetCore.Mvc;
using SchoolFinder.Application;
using SchoolFinder.Common;
using SchoolFinder.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ControllerBase<TEntity, TDto> : ControllerBase 
        where TEntity : class 
        where TDto : class
    {
        protected readonly IApplicationService<TEntity, TDto> appService;

        public ControllerBase(IApplicationService<TEntity, TDto> appService)
        {
            this.appService = appService;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAll([FromQuery] FilterBase filter)
        {
            return await this.ControllerFlow(async () => 
            {
                return await appService.GetAll(filter);
            });
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById([FromQuery] object id)
        {
            return await this.ControllerFlow(async () => 
            {
                return await appService.GetOneById(id);
            });
        }

        private async Task<IActionResult> ControllerFlow(Func<Task<IEnumerable<TDto>>> appServiceCall)
        {
            var response = new HttpResponse<TDto>();
            try
            {
                var result = await appServiceCall();
                response.Count = result.Count();
                response.Data = result.ToList();
                return Ok(response);
            }
            catch (Exception ex)
            {
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