import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { SchoolAdministrativeDepartment } from '../models/school-administrative-department.view-model';
import { SchoolType } from '../models/school-type.view-model';

@Injectable({
  providedIn: 'root'
})
export class FiltersPanelService {

  constructor(private apiService: ApiService) { }

  public getSchoolTypes() {
    return this.apiService.setResource("SchoolType").get<SchoolType>();
  }

  public getSchoolAdministrativeDepartments() {
    return this.apiService.setResource("SchoolAdministrativeDepartment").get<SchoolAdministrativeDepartment>();
  }
}
