using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolFinder.Common;
using SchoolFinder.Data.Models;
using SchoolFinder.Services;

namespace SchoolFinder.Data.Repositories
{
    public class SchoolRepository : Repository<School>
    {
        private readonly IGeoDistanceService _geoDistanceService;

        public SchoolRepository(
            DataContext context,
            IGeoDistanceService geoDistanceService) : base(context)
        {
            this._geoDistanceService = geoDistanceService;
        }

        public override QueryResult<School> GetAll(IFilter<School> filter)
        {
            var schoolFilter = filter as SchoolFilter;

            if (filter.QueryBehavior == nameof(EQueryBehavior.OrderBySmallestDistance))
            {
                var query = this.context
                .Set<School>()
                .AsNoTracking()
                .Where(_ => schoolFilter.Type == null || _.Type == schoolFilter.Type)
                .Where(_ => schoolFilter.AdministrativeDepartment == null || _.AdministrativeDepartment == schoolFilter.AdministrativeDepartment)
                .Select(_ => new School
                (
                    _.Id,
                    _.Address,
                    _.Name,
                    _.AddressNumber,
                    0.0d,
                    _.Latitude,
                    _.Longitude
                ))
                .ToList();

                int count = query.Count();
                var origin = schoolFilter.OriginCoordinates;

                var result = query
                    .Select(_ => new School
                    (
                        _.Id,
                        _.Address,
                        _.Name,
                        _.AddressNumber,
                        distance: this._geoDistanceService.GetDistanceBetweenCoordinates(origin, new double[] { _.Latitude, _.Longitude }),
                        _.Latitude,
                        _.Longitude
                    ))
                    .OrderBy(_ => _.Distance)
                    .Where(_ => schoolFilter.Distance == 0.0d || _.Distance <= schoolFilter.Distance)
                    .Skip(schoolFilter.PageNumber * schoolFilter.PaginationSize)
                    .Take(schoolFilter.PaginationSize);

                    var dbg = result.ToList();

                return new QueryResult<School>()
                {
                    Data = result,
                    Count = count
                };
            }
            return base.GetAll(filter);
        }
    }
}