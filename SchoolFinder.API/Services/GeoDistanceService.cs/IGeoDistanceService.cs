namespace SchoolFinder.Services
{
    public interface IGeoDistanceService
    {
        double GetDistanceBetweenCoordinates(double[] origin, double[] destination);
    }
}