import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  public expandFiltersPanel = new BehaviorSubject<boolean>(false);
  public expandSchoolExplorer = new BehaviorSubject<boolean>(false);
  public foundLocationCoordinates = new ReplaySubject<number[]>();
  
  constructor() {
  }
}
