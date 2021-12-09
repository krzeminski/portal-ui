import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;

  constructor(private readonly token: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes(this.apiUrl + '/authenticate') ||
      request.url.includes(this.apiUrl + '/register') ||
      request.url.includes(this.apiUrl + '/reset')
    ) {
      return next.handle(request);
    }
    const token = this.token.getToken();
    const httpRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(httpRequest).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.token.validateToken();
          }
        }
      )
    );
  }
}
