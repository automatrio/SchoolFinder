import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../models/http-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = environment.apiURL;
  
  private resource: string;

  constructor(private httpClient: HttpClient) { }

  public setResource(resourceName: string) {
    this.resource = resourceName;
    return this;
  }

  public get<T>(parameters?: { [key: string]: any }) : Observable<HttpResponse<T>> {
    let httpParameters = new HttpParams();

    if (parameters)
      Object.keys(parameters).forEach(key => {
        if (Array.isArray(parameters[key])) {
          Array.from(parameters[key]).forEach((el: any) => {
            httpParameters = httpParameters.append(key, el);
          })
        } else {
          httpParameters = httpParameters.append(key, parameters[key]);
        }
      });
    
    return this.httpClient.get<HttpResponse<T>>(`${this.apiURL}/${this.resource}`, { params: httpParameters });
  }

  public getOne<T>(objectId: any) {
    return this.httpClient.get<HttpResponse<T>>(`${this.apiURL}/${this.resource}/${objectId}`);
  }
}
