import { School } from "src/app/main/schools-table/models/school.view-model";
import { Pushpin } from "../models/pushpin.model";

export class PushpinFactory {

    private static locationIconURL = '../../../assets/location_icon.svg';
    public static fromSchool(school: School) {
        return {
            latitude: school.latitude,
            longitude: school.longitude,
            options: {
                title: school.name,
                color: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
            } as Microsoft.Maps.IPushpinOptions
        } as Pushpin;
    }

    public static fromLocation(coords: number[]) {
        return {
            latitude: coords[0],
            longitude: coords[1],
            options: {
                title: "Você",
                icon: PushpinFactory.locationIconURL
            } as Microsoft.Maps.IPushpinOptions
        } as Pushpin;
    }
}