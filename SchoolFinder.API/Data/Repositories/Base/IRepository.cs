using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.Data.Repositories
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> GetByIdAsync(object id);
        IQueryable<T> GetCustomData();
    }
}