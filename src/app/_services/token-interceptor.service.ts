import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_NAME } from '../_shared/constants';
import { tap } from 'rxjs/operators';
import { SecurityService } from './security.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private serviceSecurity: SecurityService,
    private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(TOKEN_NAME);
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          //no hacemos nada porque todo está ok
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }
        }
      }, err => {
        console.log("err: "+JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            alert("Ocurri&oacute; un error al validar su token... intente loguearse nuevamente");
            this.serviceSecurity.cerrarSesion();
          }
        } else if (err instanceof HttpErrorResponse) {
          let errorMessage = err.message || err.error.mensaje;
          this.snackBar.open(errorMessage, 'ERROR', { duration: 5000 });
        }
      })
    );
  }
}
