import { Injectable } from '@angular/core';
import { HttpResponse } from 'src/app/common/models/http-response.model';
import { ApiService } from 'src/app/common/services/api.service';
import { School } from '../schools-table/models/school.view-model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private apiService: ApiService) { }

  public getSchoolInfosAndDistance(coordinates: number[]) {
    const filter = {
      queryBehavior: "OrderBySmallestDistance",
      paginationSize: 5,
      pageNumber: 0,
      originCoordinates: [ coordinates[0], coordinates[1] ]
    };
    return new Promise<HttpResponse<School>>(resolve => {
      this.apiService
        .setResource("School")
        .get<School>(filter)
        .subscribe(response => {
          resolve(response);
        });
    });
  }
}
