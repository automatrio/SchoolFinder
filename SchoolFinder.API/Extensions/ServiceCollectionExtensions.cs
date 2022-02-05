using Microsoft.Extensions.DependencyInjection;
using SchoolFinder.Application;
using SchoolFinder.Application.Dtos;
using SchoolFinder.Data.Models;
using SchoolFinder.Data.Repositories;
using SchoolFinder.Services;

namespace SchoolFinder.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IRepository<School>, SchoolRepository>();
            services.AddScoped<IRepository<SchoolType>, SchoolTypeRepository>();
            services.AddScoped<IRepository<SchoolAdministrativeDepartment>, SchoolAdministrativeDepartmentRepository>();
            services.AddScoped<IGeoDistanceService, GeoDistanceService>();
            services.AddScoped<IApplicationService<School, SchoolDto>, ApplicationService<School, SchoolDto>>();
            services.AddScoped<IApplicationService<SchoolType, SchoolTypeDto>, ApplicationService<SchoolType, SchoolTypeDto>>();
            services.AddScoped<IApplicationService<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto>, ApplicationService<SchoolAdministrativeDepartment, SchoolAdministrativeDepartmentDto>>();
            return services;
        }
    }
}