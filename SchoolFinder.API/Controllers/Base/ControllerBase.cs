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

        public virtual async Task<IActionResult> GetAll([FromQuery] IFilter<TEntity> filter)
        {
            return await this.ControllerFlow(async () => 
            {
                return await appService.GetAll(filter);
            });
        }

        public virtual async Task<IActionResult> GetById(object id)
        {
            return await this.ControllerFlow(async () => 
            {
                return await appService.GetOneById(id);
            });
        }

        protected async Task<IActionResult> ControllerFlow(Func<Task<QueryResult<TDto>>> appServiceCall)
        {
            var response = new HttpResponse<TDto>();
            try
            {
                var result = await appServiceCall();
                response.Count = result.Count;
                response.Data = result.Data;
                response.Success = true;
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