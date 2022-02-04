using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolFinder.Data;

namespace SchoolFinder.Application
{
    public interface IApplicationService<TEntity, TDto>
        where TEntity : class
        where TDto : class
    {
        Task<IEnumerable<TDto>> GetAll(FilterBase filter);
        Task<IEnumerable<TDto>> GetOneById(object id);
    }
}