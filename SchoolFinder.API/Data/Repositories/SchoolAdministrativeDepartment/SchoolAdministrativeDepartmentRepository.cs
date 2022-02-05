using SchoolFinder.Common;
using SchoolFinder.Data.Filters;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Repositories
{
    public class SchoolAdministrativeDepartmentRepository : Repository<SchoolAdministrativeDepartment>
    {
        public SchoolAdministrativeDepartmentRepository(DataContext context) : base(context)
        {
        }

        public virtual QueryResult<SchoolAdministrativeDepartment> GetAll(SchoolAdministrativeDepartmentFilter filter)
        {
            return base.GetAll(filter);
        }
    }
}