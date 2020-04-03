import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request != null) {
      const authService = this.injector.get(AuthService);
      let tokenizedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });

      return next.handle(tokenizedReq).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(["login"]);
            return throwError(error);
          }
          return throwError(error);
        })
      );
    }
  }
}
