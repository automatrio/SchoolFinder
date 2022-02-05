using System.Threading.Tasks;
using SchoolFinder.Common;

namespace SchoolFinder.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        QueryResult<TEntity> GetAll(IFilter<TEntity> filter);
        Task<TEntity> GetByIdAsync(object id);
    }
}