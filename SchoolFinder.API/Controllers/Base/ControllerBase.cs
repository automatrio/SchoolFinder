using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Common;
using SchoolFinder.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ControllerBase<TEntity, TDto> : ControllerBase where TEntity : class
    {
        protected readonly IRepository<TEntity> _repository;
        protected readonly IMapper _mapper;

        public ControllerBase(IRepository<TEntity> repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAll()
        {
            return await this.ControllerFlow(async (rep, mapper) => 
            {
                var entities = await rep.GetAll().ToListAsync();
                return entities.Select(e => mapper.Map<TDto>(e));
            });
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById([FromQuery] object id)
        {
            return await this.ControllerFlow(async (rep, mapper) => 
            {
                var entity = await rep.GetByIdAsync(id);
                return new List<TDto>()
                {
                    mapper.Map<TDto>(entity),
                };
            });
        }

        private async Task<IActionResult> ControllerFlow(Func<IRepository<TEntity>, IMapper, Task<IEnumerable<TDto>>> repositoryCall)
        {
            var response = new HttpResponse<TDto>();
            try
            {
                var result = await repositoryCall(this._repository, this._mapper);
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