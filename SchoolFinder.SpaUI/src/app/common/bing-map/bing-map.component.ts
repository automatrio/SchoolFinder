import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventBusService } from 'src/app/global/event-bus.service';
import { environment } from 'src/environments/environment';
import { PushpinFactory } from '../helpers/pushpin-factory.helper';
import { Pushpin } from '../models/pushpin.model';

@Component({
  selector: 'bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent implements OnChanges, AfterViewInit  {

  pushPins$: Observable<Pushpin[]>;
  foundLocationCoordinates$: Observable<number[]>;

  map = new BehaviorSubject<Microsoft.Maps.Map | null>(null);

  @ViewChild('map') mapViewChild!: ElementRef;

  constructor(public eventBusService: EventBusService) {
    this.pushPins$ = this.eventBusService.pushPins.asObservable();
    this.foundLocationCoordinates$ = this.eventBusService.foundLocationCoordinates.asObservable(); 

  }

  ngOnChanges() {
  }

  async ngAfterViewInit() {
    await this.createmap();
    this.eventBusService.pushPins.subscribe(pins => {
      pins.forEach(p => this.insertPushPin(p));
    });
  }

  async createmap() {
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

    // this.map.setView({ center: location });
    const options = {
      credentials: environment.bingMapsCredentials,
      center: center
    } as Microsoft.Maps.IMapLoadOptions;

    this.map.next(new Microsoft.Maps.Map(
      this.mapViewChild.nativeElement,
      options
    ));

    this.insertPushPin(foundLocationPushpin);
  }

  public insertPushPin(pushPin: Pushpin) {
    const location = {
      latitude: pushPin.latitude,
      longitude: pushPin.longitude
    } as Microsoft.Maps.Location;

    const pin = new Microsoft.Maps.Pushpin(location, pushPin.options);

    Microsoft.Maps.Events.addHandler(pin, 'mouseover', function (e: any) {
      e.target.setOptions({ transform: "scale(1.2)" });
    });

    Microsoft.Maps.Events.addHandler(pin, 'click', function (e: any) {
      console.log("Clicked", e.target);
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


}