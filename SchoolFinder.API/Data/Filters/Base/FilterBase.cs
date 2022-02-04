namespace SchoolFinder.Data
{
    public class FilterBase
    {
        public virtual string QueryBehavior { get; set; }
        public virtual int PaginationSize { get; set; }
        public virtual int PageNumber { get; set; }
    }
}