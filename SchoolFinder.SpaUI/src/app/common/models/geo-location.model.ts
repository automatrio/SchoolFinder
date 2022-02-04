export class GeoLocation {
    name: string;
    point: {
        coordinates: number[];
    };
    entityType: string;
    address: {
        countryRegion: string;
        locality: string;
    };
    boundingBox: number[];
}