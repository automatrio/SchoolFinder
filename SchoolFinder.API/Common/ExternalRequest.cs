using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;

namespace SchoolFinder.Common
{
    public static class ExternalRequest<TOutput>
    {
        public static async Task<TOutput> Execute(string resourceURL, params (string key, object value)[] queryParameters)
        {
            using (var httpClient = new HttpClient()) 
            {
                var query = new Dictionary<string, string>();

                foreach(var parameter in queryParameters)
                {
                    query.Add(parameter.key, parameter.value.ToString());
                }

                var url = QueryHelpers.AddQueryString(resourceURL, query);

                var message = (await httpClient
                    .GetAsync(url))
                    .EnsureSuccessStatusCode();

                var jsonString = await message.Content.ReadAsStringAsync();

                return JsonSerializer.Deserialize<TOutput>(jsonString);
            }
        } 
    }
}