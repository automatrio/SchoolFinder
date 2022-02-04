using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Common;
using SchoolFinder.Data.Models;

namespace SchoolFinder.Data
{
    public static class DatabaseSeeder
    {
        static Regex GetWordRegex = new Regex(@"([^\s\d]+)", RegexOptions.Compiled);
        static Regex IsNotAnEmailOrWebsiteRegex = new Regex(@"^[^\@\/\.]+$", RegexOptions.Compiled);
        static List<string> InstitutionsNames = new() {
            "EMEI",
            "IEI",
            "EEI",
            "EEF",
            "CEU",
            "EEEI",
            "EE",
        };

        public static async Task SeedDatabase(this IHost builder)
        {
            using (var scope = builder.Services.CreateScope())
            {
                while (true)
                {
                    try
                    {
                        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
                        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

                        if (context.Schools.Any())
                        {
                            context.Schools.RemoveRange(context.Schools);
                            context.SaveChanges();
                        }

                        var url = config.GetSection("DataPOAExternalURL").Value;
                        var response = await ExternalRequest<DataPOAHttpResponseDto<DataPOASchoolDto>>.Execute(url, ("limit", 5000));

                        if (!response.Success) continue;

                        var mapperConfiguration = new MapperConfiguration(config => {
                            config.CreateMap<DataPOASchoolDto, School>().ReverseMap();    
                        });

                        IMapper mapper = mapperConfiguration.CreateMapper();

                        var schools = response.Result.Schools.Select(dto => {
                            var entity = mapper.Map<School>(dto);
                            return CapitalizeWordsAndRemoveWhitespaces(entity);
                        });

                        context.Schools.AddRange(schools);
                        context.SaveChanges();

                        break;
                    }
                    catch
                    {
                        Thread.Sleep(5000);
                        continue;
                    }
                }
            }
        }

        private static School CapitalizeWordsAndRemoveWhitespaces(School entity)
        {
            foreach(var prop in entity.GetType().GetProperties())
            {
                if (prop.GetValue(entity) is string val)
                {
                    if (val is null)
                    {
                        prop.SetValue(entity, null);
                        continue;
                    }

                    if (!IsNotAnEmailOrWebsiteRegex.IsMatch(val))
                    {
                        prop.SetValue(entity, val.TrimEnd());
                        continue;
                    }

                    var results = GetWordRegex
                        .Matches(val)
                        .Cast<Match>()
                        .Select(x => x.Value);

                    if (results.Any())
                    {
                        var capitalizedWords = results.Select(word => 
                        {
                            if (InstitutionsNames.Contains(word)) return word;
                            return word.Substring(0, 1).ToUpper() + word[1..].ToLower();
                        });
                        prop.SetValue(entity, string.Join(' ', capitalizedWords).TrimEnd());
                    }
                }
            }
            return entity;
        }
    }
}