using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolFinder.Common;
using SchoolFinder.Data;

namespace SchoolFinder.Application
{
    public interface IApplicationService<TEntity, TDto>
        where TEntity : class
        where TDto : class
    {
        Task<QueryResult<TDto>> GetAll(IFilter<TEntity> filter);
        Task<QueryResult<TDto>> GetOneById(object id);
    }
}