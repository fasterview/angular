import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let headers = request.headers.set("Authorization", "Bearer " + this._auth.getToken())
                                  .set("Accept", "application/json");

    let authRequest = request.clone({
      headers
    });

    return next.handle(authRequest);
  }
}
