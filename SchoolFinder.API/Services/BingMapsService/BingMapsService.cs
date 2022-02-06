using BingMapsRESTToolkit;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolFinder.Services
{
    public class BingMapsService : IBingMapsService
    {
        private readonly IConfiguration configuration;

        public BingMapsService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<IEnumerable<Location>> GetPossibleLocations(string query)
        {
            var request = new GeocodeRequest()
            {
                BingMapsKey = configuration.GetSection("BingMapsKey").Value,
                Query = query
            };
            var result = await request.Execute();

            if (result.ErrorDetails is not null && result.ErrorDetails.Count() > 0)
            {
                throw new Exception(string.Join('\n', result.ErrorDetails));
            }

            return result.ResourceSets
                .SelectMany(resourceSet => resourceSet.Resources)
                .Cast<Location>()
                .Where(_ => _.Address.Locality == "Porto Alegre")
                .OrderByDescending(_ => _.ConfidenceLevelType);
        }

        public async Task<IEnumerable<Route>> GetRoute(double[] coords)
        {
            var request = new RouteRequest();

            request.BingMapsKey = configuration.GetSection("BingMapsKey").Value;
            request.Waypoints = new List<SimpleWaypoint>(2) {
                    new SimpleWaypoint(coords[0], coords[1]),
                    new SimpleWaypoint(coords[2], coords[3])
            };

            var result = await request.Execute();

            if (result.ErrorDetails is not null && result.ErrorDetails.Count() > 0)
            {
                throw new Exception(string.Join('\n', result.ErrorDetails));
            }

            return result.ResourceSets
                .SelectMany(resourceSet => resourceSet.Resources)
                .Cast<Route>();
        }
    }
}