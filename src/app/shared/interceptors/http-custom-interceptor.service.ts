
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpCustomInterceptorService implements HttpInterceptor {
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
            this._snackBar.open('User not logged', 'OK');
          }
        }
      })
    );
  }
}