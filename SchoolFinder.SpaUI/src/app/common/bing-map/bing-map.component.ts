import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.scss']
})
export class BingMapComponent implements OnChanges, AfterViewInit  {

  @ViewChild('streetsideMap') streetsideMapViewChild!: ElementRef;

  // get center() {
  //   return this.service.center$;
  // }

  streetsideMap: Microsoft.Maps.Map;

  position: Microsoft.Maps.Location;

  log: string[] = [];
  
  constructor() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    // this.log.push('AfterViewInit');
    this.createStreetSideMap();
    // this.service.center$.pipe(
    //   filter(coords => !!coords),
    //   take(1)
    // ).subscribe(coords => {
    //   const [lat, lon] = coords;
    //   this.log.push(`Got coords from service: ${coords}`);
    //   const position = new Microsoft.Maps.Location(lat, lon);
    //   this.streetsideMap.setView({ center: position });
    //   this.log.push(`current Center: ${this.streetsideMap.getCenter()}`);
    // });
  }

  createStreetSideMap() {
    const center = new Microsoft.Maps.Location(47.6149, -122.1941);
    const options = {
      credentials: 'AsXAoIWVfDyZeUDnGvxgkXdyJVE7-KWFeu2g2Kc1YiHnUsLCmLoX3myVPJS4UdAp',
      center: center
    } as Microsoft.Maps.IMapLoadOptions;

    this.streetsideMap = new Microsoft.Maps.Map(
      this.streetsideMapViewChild.nativeElement,
      options
    );

    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
      title: 'Microsoft',
      subTitle: 'City Center',
      text: '1'
    });

    Microsoft.Maps.Events.addHandler(pin, 'mouseover', function (e: any) {
      e.target.setOptions({ color: "#000000" });
    });

      //Add the pushpin to the map
      this.streetsideMap.entities.push(pin);
  }

  hasLogEntries() {
    return this.log.length > 0;
  }
}