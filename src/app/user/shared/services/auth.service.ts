import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "http://localhost:5000/auth/login";
  private regUrl = "http://localhost:5000/auth/signup";

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(data) {
    return this.http.post(this.url, data).pipe(
      map(res => {
        if (res && res["auth-token"]) {
          localStorage.setItem("auth-token", res["auth-token"]);
          return true;
        }
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  register(data) {
    return this.http.post(this.regUrl, data).pipe(
      map(res => {
        return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  isLoggedIn() {
    this.jwtHelper.isTokenExpired();
  }

  get currentUser() {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      return null;
    }
    console.log(this.jwtHelper.decodeToken(token));
    return this.jwtHelper.decodeToken(token);
  }

  getToken() {
    let token = localStorage.getItem("auth-token");
    return token ? token : null;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("auth-token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}
