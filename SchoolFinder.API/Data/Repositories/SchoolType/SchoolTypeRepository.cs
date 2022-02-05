using SchoolFinder.Common;
using SchoolFinder.Data.Filters;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Repositories
{
    public class SchoolTypeRepository : Repository<SchoolType>
    {
        public SchoolTypeRepository(DataContext context) : base(context)
        {
        }

        public virtual QueryResult<SchoolType> GetAll(SchoolTypeFilter filter)
        {
            return base.GetAll(filter);
        }
    }
}