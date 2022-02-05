import { Injectable } from '@angular/core';
import { HttpResponse } from 'src/app/common/models/http-response.model';
import { ApiService } from 'src/app/common/services/api.service';
import { School } from '../models/school.view-model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private apiService: ApiService) { }

  public getSchoolInfosAndDistance(coordinates: number[], pageIndex = 0, filters: any = {}) {
    const filter = {
      queryBehavior: "OrderBySmallestDistance",
      paginationSize: 5 * 3,
      pageNumber: Math.max(pageIndex - 1, 0),
      originCoordinates: [ coordinates[0], coordinates[1] ],
      ...filters
    };
    return this.apiService
        .setResource("School")
        .get<School>(filter);
  }

  public getOne(schoolId: number) {
    return this.apiService.setResource("School").getOne<School>(schoolId);
  }
}
