using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SchoolFinder.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Extensions;
using System.IO;
using System.Reflection;
using System;

namespace SchoolFinder.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddDbContext<DataContext>(options => options.UseSqlServer(
                Configuration.GetSection("ConnectionStrings:Default").Value
            ));

            services.AddAppServices();

            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SchoolFinder.API", Version = "v1" });
                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename)); 
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins(Configuration.GetSection("AllowedOrigins").GetChildren().Select(_ => _.Value).ToArray()));

            app.UseAuthorization();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwagger();  
        
            app.UseSwaggerUI(c =>  
            {  
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); 
            });  
        
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("index", "fallback");
            });
        }
    }
}
