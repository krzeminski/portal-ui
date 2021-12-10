import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.getCSRFToken();
    console.log(token);
    if (!!token && request.method !== 'GET' && request.method !== 'HEAD') {
      const requestToForward = request.clone({ setHeaders: { 'X-XSRF-TOKEN': token } });
      return next.handle(requestToForward);
    }
    return next.handle(request);
  }

  getCSRFToken(): string {
    return HeadersInterceptor.getCookie('XSRF-TOKEN');
  }

  private static getCookie(name: string): string {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
