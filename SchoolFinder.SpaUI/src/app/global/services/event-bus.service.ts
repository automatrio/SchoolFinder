import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpResponse } from '../../common/models/http-response.model';
import { Pushpin } from '../../common/models/pushpin.model';
import { School } from '../../main/schools-table/models/school.view-model';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  public expandFiltersPanel = new BehaviorSubject<boolean>(false);
  public expandSchoolExplorer = new BehaviorSubject<boolean>(false);
  public foundLocationCoordinates = new BehaviorSubject<number[]>([]);
  public mapLoaded = new BehaviorSubject<boolean>(false);
  public nearestSchools = new ReplaySubject<HttpResponse<School>>(1);
  public schoolToExplore = new ReplaySubject<School>(1);
  public pushPins = new BehaviorSubject<Pushpin[]>([]);
  public clickedPushpinSchoolId = new ReplaySubject<number>(1);
  
  constructor() {
  }
}
