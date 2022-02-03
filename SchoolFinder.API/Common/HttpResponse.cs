using System.Collections.Generic;
using System.Text.Json.Serialization;
using SchoolFinder.Application.Dtos;

namespace SchoolFinder.Common
{
    public class HttpResponse<T>
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public IEnumerable<T> Data { get; set; }
        public int Count { get; set; }
    }
}