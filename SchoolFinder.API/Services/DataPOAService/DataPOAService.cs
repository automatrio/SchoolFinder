using Microsoft.AspNetCore.Hosting;

namespace SchoolFinder.Services {
    public class DataPOAService {
        private readonly IWebHostEnvironment _environment;

        public DataPOAService(IWebHostEnvironment environment)
        {
            this._environment = environment;
        }
    }
}