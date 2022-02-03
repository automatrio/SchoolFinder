using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SchoolFinder.Data.Models;
using SchoolFinder.Data.Repositories;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolController : ControllerBase<School, SchoolDto>
    {
        public SchoolController(ISchoolRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}