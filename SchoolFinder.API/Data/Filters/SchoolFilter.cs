using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Filters
{
    public class SchoolFilter : IFilter<School>
    {
        public virtual string QueryBehavior { get; set; }
        public virtual int PaginationSize { get; set; }
        public virtual int PageNumber { get; set; }
        public virtual double[] OriginCoordinates { get; set; }
        public virtual int SchoolAdministrativeDepartmentId { get; set; }
        public virtual int SchoolTypeId { get; set; }
        public virtual double Distance { get; set; }
    }
}