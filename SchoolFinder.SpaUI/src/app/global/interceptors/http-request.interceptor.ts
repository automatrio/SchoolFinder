import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.start();
    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe({
          next: (event) => {
            observer.next(event);
          },
          error: (error) => {
            observer.error(error);
          },
          complete: () => {
            this.spinnerService.stop();
          }
        });
    });
  }
}
