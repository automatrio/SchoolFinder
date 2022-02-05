using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Common;

namespace SchoolFinder.Data.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DataContext context;

        public Repository(DataContext context)
        {
            this.context = context;
        }

        public virtual QueryResult<TEntity> GetAll(IFilter<TEntity> filter)
        {
            var query = this.context
                .Set<TEntity>()
                .AsNoTracking();

            query = this.CustomBehavior(query, filter);
            query = this.CustomFilters(query, filter);

            return new QueryResult<TEntity>()
            {
                Data = this.PaginateResult(query, filter),
                Count = this.CustomCount(query, filter)
            };
        }

        public virtual async Task<TEntity> GetByIdAsync(object id)
        {
            return await this.context.Set<TEntity>().FindAsync(id);
        }

        protected virtual IQueryable<TEntity> CustomBehavior(IQueryable<TEntity> query, IFilter<TEntity> filter)
        {
            return query;
        }

        protected virtual IQueryable<TEntity> CustomFilters(IQueryable<TEntity> query, IFilter<TEntity> filter)
        {
            return query;
        }

        protected virtual int CustomCount(IQueryable<TEntity> query, IFilter<TEntity> filter)
        {
            return query.Count();
        }

        protected virtual IQueryable<TEntity> PaginateResult(IQueryable<TEntity> query, IFilter<TEntity> filter)
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