import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { School } from 'src/app/main/schools-table/models/school.view-model';

@Injectable({
  providedIn: 'root'
})
export class SchoolExplorerFieldsService {

  formGroup: FormGroup;
  fields: string[];

  private static forms = [
    "name",
    "address",
    "addressNumber",
    "neighborhood",
    "zipCode",
    "administrativeDepartment",
    "type",
    "telephoneNumber",
    "email",
    "website",
    "blog",
    "twitter",
    "facebook",
  ];

  constructor() {
    this.formGroup = this.generateForm();
  }

  public fillOutForm(data: School) {
    SchoolExplorerFieldsService.forms.forEach(key => {
      if (this.formGroup.controls[key]) {
        console.log("data[key]", data[key]);
        if (!data[key] || data[key] == "") {
          this.formGroup.controls[key].setValue("---");
        } else {
          this.formGroup.controls[key].setValue(data[key]);
        }
      }
      return key;
    });
  }

  private generateForm() {
    let controls = {};
    this.fields = SchoolExplorerFieldsService.forms.map(key => {
      Object.assign(controls, {
        [key]: new FormControl({value: '', disabled: true})  
      });
      return key;
    });
    console.log("this.fields", this.fields);
    return new FormGroup(controls);
  }
}
