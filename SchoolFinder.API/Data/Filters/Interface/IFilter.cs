namespace SchoolFinder.Data
{
    public interface IFilter<TEntity>
    {
        string QueryBehavior { get; set; }
        int PaginationSize { get; set; }
        int PageNumber { get; set; }
    }
}