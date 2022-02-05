using SchoolFinder.Data.Models;

namespace SchoolFinder.Data
{
    public class SchoolFilter : IFilter<School>
    {
        public SchoolFilter()
        {
        }

        public virtual string QueryBehavior { get; set; }
        public virtual int PaginationSize { get; set; }
        public virtual int PageNumber { get; set; }
        public virtual double[] OriginCoordinates { get; set; }
        public string AdministrativeDepartment { get; set; }
        public string Type { get; set; }
        public double Distance { get; set; }
    }
}