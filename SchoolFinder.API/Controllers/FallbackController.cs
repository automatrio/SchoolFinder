using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FallbackController : Controller
    {
        public FallbackController()
        {
        }

        [HttpGet]
        public ActionResult Index()
        {
            var indexPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            return PhysicalFile(indexPath, "text/HTML");
        }
    }
}
