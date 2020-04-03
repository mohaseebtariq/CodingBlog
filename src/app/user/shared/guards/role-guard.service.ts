import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.currentUser;
    console.log(user.role === next.data.role);
    if (user.role === next.data.role) {
      return true;
    }

    // navigate to not found page
    this.router.navigate(["/"]);
    return false;
  }
}
