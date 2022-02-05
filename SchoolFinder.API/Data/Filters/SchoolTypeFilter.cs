using SchoolFinder.Data.Models;

namespace SchoolFinder.Data.Filters
{
    public class SchoolTypeFilter : IFilter<SchoolType>
    {
        public virtual string QueryBehavior { get; set; }
        public virtual int PaginationSize { get; set; }
        public virtual int PageNumber { get; set; }
        public virtual int Id { get; set; }
        public virtual string ImageSrc { get; set; }
        public virtual string Title { get; set; }
        public virtual string Color { get; set; }
    }
}