using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<TDto>> GetAll(FilterBase filter)
        {
            var entities = await repository
                .GetAll(filter)
                .ToListAsync();
            return entities.Select(e => mapper.Map<TEntity, TDto>(e));
        }

        public async Task<IEnumerable<TDto>> GetOneById(object id)
        {
            var entity = await repository.GetByIdAsync(id);
            return new List<TDto>()
            {
                mapper.Map<TEntity, TDto>(entity),
            };
        }
    }
}