using System.Collections.Generic;
using System.Text.Json.Serialization;
using SchoolFinder.Application.Dtos;

namespace SchoolFinder.Common
{
    public class HttpResponse<T>
    {
        public bool Success { get; set; }
        public List<string> Errors { get; set; }
        public List<T> Data { get; set; }
        public int Count { get; set; }
    }
}