namespace SchoolFinder.Data
{
    public class SchoolFilter
    {
        public virtual string QueryBehavior { get; set; }
        public virtual int PaginationSize { get; set; }
        public virtual int PageNumber { get; set; }
        public virtual double[] OriginCoordinates { get; set;}
    }
}