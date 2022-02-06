using BingMapsRESTToolkit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolFinder.Services
{
    public interface IBingMapsService
    {
        Task<IEnumerable<Location>> GetPossibleLocations(string query);
        Task<IEnumerable<Route>> GetRoute(double[] coords);
    }
}