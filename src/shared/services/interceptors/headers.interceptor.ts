import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/shared/models';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  errorResponse: ErrorResponse;

  constructor(private router: Router, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (err.error == null) {
              this.errorResponse = { traceID: '', userMessage: "Please Login to continue." }
            }
            else {
              this.errorResponse = err.error;
            }
          }
          else if (err.status == 500) {
            if (err.error == null) {
              this.errorResponse = { traceID: '', userMessage: "Something went wrong." }
            }
            else {
              this.errorResponse = err.error;
            }
          }
          this.router.navigate(['/error'], { state: this.errorResponse });
          this.spinner.hide();
        }
        return throwError(err)
      })
    );
  }
}
