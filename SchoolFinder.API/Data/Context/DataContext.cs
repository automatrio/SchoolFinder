using Microsoft.EntityFrameworkCore;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<School> Schools { get; set;}
    }
}