using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Repositories
{
    public interface ISchoolRepository : IRepository<School>
    {
    }
}