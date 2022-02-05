using System.Collections.Generic;
using System.Linq;

namespace SchoolFinder.Common
{
    public class QueryResult<T>
    {
        public IEnumerable<T> Data { get; init; }
        public int Count { get; init; }
    }
}