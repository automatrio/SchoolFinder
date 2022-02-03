using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SchoolFinder.Data.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DataContext context;

        public Repository(DataContext context)
        {
            this.context = context;
        }

        public virtual IQueryable<T> GetAll()
        {
            return this.context.Set<T>().AsNoTracking();
        }

        public virtual async Task<T> GetByIdAsync(object id)
        {
            return await this.context.Set<T>().FindAsync(id);
        }

        public abstract IQueryable<T> GetCustomData();
    }
}