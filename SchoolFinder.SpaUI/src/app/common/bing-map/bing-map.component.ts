import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventBusService } from 'src/app/global/services/event-bus.service';
import { ToastService } from 'src/app/global/services/toast.service';
import { environment } from 'src/environments/environment';
import { PushpinFactory } from '../helpers/pushpin-factory.helper';
import { Pushpin } from '../models/pushpin.model';

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent implements AfterViewInit  {

  pushPins$: Observable<Pushpin[]>;
  foundLocationCoordinates$: Observable<number[]>;
  currentPins: {pushpin: Microsoft.Maps.Pushpin, schoolId: number}[] = [];
  directionsManager: Microsoft.Maps.Directions.DirectionsManager;
  map = new BehaviorSubject<Microsoft.Maps.Map | null>(null);

  @ViewChild('map') mapViewChild!: ElementRef;

  constructor(public eventBusService: EventBusService, private toastService: ToastService) {
    this.pushPins$ = this.eventBusService.pushPins.asObservable();
    this.foundLocationCoordinates$ = this.eventBusService.foundLocationCoordinates.asObservable(); 
  }

  async ngAfterViewInit() {
    await this.createmap();
    this.eventBusService.pushPins.subscribe(pins => {
      this.removePushpins();
      this.insertPushpins(pins);
    });
    this.insertFoundLocationPushpin();
  }

  private insertPushpins = (pins: Pushpin[]) => pins.forEach(p => this.insertPushPin(p));

  private insertFoundLocationPushpin() {
    this.eventBusService.foundLocationCoordinates.subscribe(coords => {
      const pin = PushpinFactory.fromLocation(coords);
      this.insertPushPin(pin, false);
    });
  }

  private removePushpins() {
    this.currentPins.forEach(pin => {
      this.map.getValue()?.entities.remove(pin.pushpin as any);
      this.currentPins = [];
    });
  }

  private async createmap() {
    let foundLocationPushpin;
    const center = await new Promise(resolve => {
      this.eventBusService.foundLocationCoordinates.subscribe(coords => {
        const location = {
          latitude: coords[0],
          longitude: coords[1]
        } as Microsoft.Maps.Location;
        foundLocationPushpin = PushpinFactory.fromLocation(coords);
        resolve(location);
      });
    });

    const options = {
      credentials: environment.bingMapsCredentials,
      center: center,
    } as Microsoft.Maps.IMapLoadOptions;

    this.map.next(new Microsoft.Maps.Map(
      this.mapViewChild.nativeElement,
      options
    ));

    this.showSchoolOrRoutetoSchoolAfterFirstTime();
  }

  private showSchoolOrRoutetoSchoolAfterFirstTime() {
    this.eventBusService.schoolToExplore.subscribe(school => {
      const destinationCoords = [school!.latitude, school!.longitude];
      if (!school!.seeRoute) {
        
        this.recenterMap(destinationCoords);
      } else {
        const originCoords = this.eventBusService.foundLocationCoordinates.getValue();
        this.getRoute(originCoords, destinationCoords);
      }
    });
  }

  private insertPushPin(pushPin: Pushpin, clickable = true) {
    const location = {
      latitude: pushPin.latitude,
      longitude: pushPin.longitude
    } as Microsoft.Maps.Location;

    const pin = new Microsoft.Maps.Pushpin(location, pushPin.options);

    if (clickable) {
      Microsoft.Maps.Events.addHandler(pin, 'mouseover', (e: any) => {
        e.target.setOptions({ text: "Explorar", color: "#42f569" });
      });
  
      Microsoft.Maps.Events.addHandler(pin, 'mouseout', (e: any) => {
        e.target.setOptions({ text: "", color: pushPin.options.color });
      });
  
      Microsoft.Maps.Events.addHandler(pin, 'click', (e: any) => {
        const id = e.target.id;
        const foundPin = this.currentPins.find(c => (c.pushpin as any).id == id);
        if (foundPin) this.eventBusService.clickedPushpinSchoolId.next(foundPin.schoolId);
      });
    }

    if (pushPin.schoolId) this.currentPins.push({
      pushpin: pin, 
      schoolId:pushPin.schoolId
    });

    const map = this.map.getValue();

    if(map) {
      map.entities.push(pin);
      return;
    } 

    this.map.subscribe(map => {
      map!.entities.push(pin);
    });
  }

  private async recenterMap(coords: number[]) {
    const location = {
      latitude: coords[0],
      longitude: coords[1]
    } as Microsoft.Maps.Location;

    this.map.getValue()?.setView({
      center: location,
      zoom: 15
    });
  }

  private getRoute(origin: number[], destination: number[]) {
    const map = this.map.getValue();
    if (!map) return;

    if(this.directionsManager) {
      this.directionsManager.clearAll();
    }

    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
      const originWaypoint = new Microsoft.Maps.Directions.Waypoint({
        location: {
          latitude: origin[0],
          longitude: origin[1]
        } as Microsoft.Maps.Location
      } as Microsoft.Maps.Directions.IWaypointOptions);
  
      const destinationWaypoint = new Microsoft.Maps.Directions.Waypoint({
        location: {
          latitude: destination[0],
          longitude: destination[1]
        } as Microsoft.Maps.Location
      } as Microsoft.Maps.Directions.IWaypointOptions);
      
  
      this.directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

      

      this.directionsManager.addWaypoint(originWaypoint);
      this.directionsManager.addWaypoint(destinationWaypoint);
  
      Microsoft.Maps.Events.addHandler(this.directionsManager, 'directionsError', this.directionsError);

      this.directionsManager.calculateDirections();
    });
  }

  private directionsError(error: any) {
    this.toastService.openErrorDialog("Desculpe, não foi possível encontrar a rota!", true);
  }
}