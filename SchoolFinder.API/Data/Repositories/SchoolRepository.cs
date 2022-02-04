using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Data.Models;
using SchoolFinder.Services;

namespace SchoolFinder.Data.Repositories
{
    public class SchoolRepository : Repository<School>, ISchoolRepository
    {
        private readonly IGeoDistanceService _geoDistanceService;

        public SchoolRepository(
            DataContext context,
            IGeoDistanceService geoDistanceService) : base(context)
        {
            this._geoDistanceService = geoDistanceService;
        }

        public async Task<IEnumerable<dynamic>> GetAll(SchoolFilter filter)
        {
            var query = await this.context
                .Set<School>()
                .AsNoTracking()
                .ToListAsync();

            var origin = filter.OriginCoordinates;

            return query
                .Select(_ => new {
                    _.Id,
                    _.Address,
                    _.Name,
                    _.AddressNumber,
                    Distance = this._geoDistanceService.GetDistanceBetweenCoordinates(origin, new double[] { _.Latitude, _.Longitude }),
                    _.Latitude,
                    _.Longitude,
                })
                .OrderBy(_ => _.Distance);
        }
    }
}