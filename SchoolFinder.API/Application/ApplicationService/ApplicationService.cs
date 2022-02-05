using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Common;
using SchoolFinder.Data;
using SchoolFinder.Data.Repositories;

namespace SchoolFinder.Application
{
    public class ApplicationService<TEntity, TDto> : IApplicationService<TEntity, TDto> 
        where TEntity : class
        where TDto : class
    {
        private readonly IRepository<TEntity> repository;
        private readonly IMapper mapper;

        public ApplicationService(IRepository<TEntity> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<QueryResult<TDto>> GetAll(IFilter<TEntity> filter)
        {
            var queryResult = repository.GetAll(filter);

            List<TEntity> entities;

            if (queryResult.Data is IEnumerable<TEntity> data)
            {
                entities = data.ToList();
            }
            else 
            {
                entities = await (queryResult
                    .Data as IQueryable<TEntity>)
                    .ToListAsync();
            }

            return new QueryResult<TDto>()
            {
                Data = this.MapEntityToDto(entities),
                Count = queryResult.Count
            };
        }

        public async Task<QueryResult<TDto>> GetOneById(object id)
        {
            var entity = await repository.GetByIdAsync(id);
            return new QueryResult<TDto>()
            {
                Data = new List<TDto>()
                {
                    this.MapEntityToDto(entity)
                },
                Count = 1
            };
        }

        protected virtual TEntity MapDtoToEntity(TDto dto) 
        {
            return mapper.Map<TDto, TEntity>(dto);
        }

        protected virtual TDto MapEntityToDto(TEntity entity) 
        {
            return mapper.Map<TEntity, TDto>(entity);
        }

        protected virtual IEnumerable<TEntity> MapDtoToEntity(IEnumerable<TDto> dtos) 
        {
            return dtos.Select(d => mapper.Map<TDto, TEntity>(d));
        }

        protected virtual IEnumerable<TDto> MapEntityToDto(IEnumerable<TEntity> entities) 
        {
            return entities.Select(e => mapper.Map<TEntity, TDto>(e));
        }
    }
}