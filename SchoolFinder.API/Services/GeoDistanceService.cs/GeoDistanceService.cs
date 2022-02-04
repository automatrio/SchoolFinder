using System;

namespace SchoolFinder.Services
{
    public class GeoDistanceService : IGeoDistanceService
    {
        public GeoDistanceService()
        {

        }

        public double GetDistanceBetweenCoordinates(double[] origin, double[] destination)
        {
            var earthRadiusKm = 6_371.0f;

            var originCoord = new Coordinate()
            {
                Latitude = origin[0],
                Longitude = origin[1]
            };

            var destinationCoord = new Coordinate()
            {
                Latitude = destination[0],
                Longitude = destination[1]
            };

            var originLatitude = originCoord.Latitude.DegreesToRadians();
            var destinationLatitude = destinationCoord.Latitude.DegreesToRadians();

            var dLatitude = (destinationCoord.Latitude - originCoord.Latitude).DegreesToRadians();
            var dLongitude = (destinationCoord.Longitude - originCoord.Longitude).DegreesToRadians();


            var a = (Math.Sin(dLatitude / 2) * Math.Sin(dLatitude / 2));
            a += Math.Sin(dLongitude / 2) * Math.Sin(dLongitude / 2) * Math.Cos(originLatitude) * Math.Cos(destinationLatitude);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return earthRadiusKm * c;
        }

        struct Coordinate
        {
            public double Latitude { get; init; }
            public double Longitude { get; init; }
        }
    }

    public static partial class NumericExtensions
    {
        public static double DegreesToRadians(this double value)
        {
            return (Math.PI / 180) * value;
        }
    }
}