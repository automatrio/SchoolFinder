import { School } from "src/app/main/schools-table/models/school.view-model";
import { Pushpin } from "../models/pushpin.model";

export class PushpinFactory {

    private static locationIconURL = '../../../assets/location_icon.svg';
    private static pushpinIcon = `
    <svg
        width="40"
        height="40"
        viewBox="0 0 10.583333 10.583334"
        version="1.1"
        id="svg5"
        sodipodi:docname="pushpin_icon.svg"
        inkscape:version="1.1.1 (3bf5ae0d25, 2021-09-20)"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        <defs
            id="defs2" />
        <g
            inkscape:label="Layer 1"
            inkscape:groupmode="layer"
            id="layer1">
            <path
            id="path6363"
            style="fill:#333333;fill-opacity:{opacity};stroke:none;stroke-width:0.217108;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:{opacity}"
            d="M 5.3638603,4.4467063 A 0.95912289,0.95912289 0 0 0 4.4047376,5.405829 0.95912289,0.95912289 0 0 0 5.3638603,6.3649518 0.95912289,0.95912289 0 0 0 6.322983,5.405829 0.95912289,0.95912289 0 0 0 5.3638603,4.4467063 Z m 0,0.3198491 A 0.63919208,0.63919208 0 0 1 6.0031341,5.405829 0.63919208,0.63919208 0 0 1 5.3638603,6.0451028 0.63919208,0.63919208 0 0 1 4.7247987,5.405829 0.63919208,0.63919208 0 0 1 5.3638603,4.7665554 Z" />
            <path
            id="path5997"
            style="fill:#333333;fill-opacity:{opacity};stroke:none;stroke-width:0.528963;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:{opacity}"
            d="M 5.3638603,3.0690208 A 2.3368086,2.3368086 0 0 0 3.0270521,5.405829 2.3368086,2.3368086 0 0 0 5.3638603,7.7426374 2.3368086,2.3368086 0 0 0 7.7006685,5.405829 2.3368086,2.3368086 0 0 0 5.3638603,3.0690208 Z m 0,0.7792807 A 1.5573287,1.5573287 0 0 1 6.921388,5.405829 1.5573287,1.5573287 0 0 1 5.3638603,6.9633567 1.5573287,1.5573287 0 0 1 3.8068494,5.405829 1.5573287,1.5573287 0 0 1 5.3638603,3.8483015 Z" />
            <path
            id="rect243"
            style="fill:{color};fill-opacity:{opacity};fill-rule:evenodd;stroke:none;stroke-width:0.339;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:{opacity}"
            d="M 7.3568306,0.10774678 4.5552527,2.3489533 V 2.5315704 H 5.3361766 V 5.5165908 H 9.6012743 V 2.5315704 h 0.7833277 v -0.1826171 0 L 9.1653941,1.4443326 V 0.31640515 H 8.4950436 v 0.63248576 z"
            sodipodi:nodetypes="ccccccccccccccc" />
        </g>
        </svg>`;

    public static fromSchool(school: School) {
        const opacity = Math.max((1 - (school.distance / 20)), 0).toFixed(3);
        return {
            latitude: school.latitude,
            longitude: school.longitude,
            schoolId: school.id,
            options: {
                title: school.name,
                color: `rgb(${Math.random() * 255}, ${Math.random() * 80}, ${Math.random() * 255})`,
                icon: PushpinFactory.pushpinIcon.replace(/\{opacity\}/g, opacity)
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