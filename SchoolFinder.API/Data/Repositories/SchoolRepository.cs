using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Repositories
{
    public class SchoolRepository : Repository<School>, ISchoolRepository
    {
        public SchoolRepository(DataContext context) : base(context)
        {
        }

        public override IQueryable<School> GetCustomData()
        {
            throw new System.NotImplementedException();
        }
    }
}