using System.Collections.Generic;
using System.Text.Json.Serialization;
using SchoolFinder.Application.Dtos;

namespace SchoolFinder.Application.Dtos
{
    public class DataPOAHttpResponseDto<T>
    {
        [JsonPropertyName("success")]
        public bool Success { get; set;}

        [JsonPropertyName("result")]
        public HttpResult Result { get; set;}
    }

    public class HttpResult
    {
        [JsonPropertyName("records")]
        public DataPOASchoolDto[] Schools { get; set;} 
    }
}