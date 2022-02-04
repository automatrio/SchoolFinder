using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SchoolFinder.Data.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> 
        where TEntity : class
    {
        protected readonly DataContext context;

        public Repository(DataContext context)
        {
            this.context = context;
        }

        public virtual IQueryable<TEntity> GetAll(FilterBase filter)
        {
            var query = this.context
                .Set<TEntity>()
                .AsNoTracking();
                
            query = this.CustomBehavior(query, filter);
            return this.PaginateResult(query, filter);
        }

        public virtual async Task<TEntity> GetByIdAsync(object id)
        {
            return await this.context.Set<TEntity>().FindAsync(id);
        }

        public virtual IQueryable<TEntity> CustomBehavior(IQueryable<TEntity> query, FilterBase filter)
        {
            return query;
        }

        public virtual IQueryable<TEntity> PaginateResult(IQueryable<TEntity> query, FilterBase filter)
        {
            if (filter.PaginationSize > 0 && filter.PageNumber > 0)
            {
                return query
                    .Take(filter.PaginationSize)
                    .Skip(filter.PaginationSize * filter.PageNumber);
            }
            else
            {
                return query;
            }
        }
    }
}