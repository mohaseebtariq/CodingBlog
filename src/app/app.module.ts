import { routes } from "./app.routing";
import { AdminModule } from "./admin/admin.module";
import { PostService } from "./user/shared/services/post.service";
import { TokenInterceptorService } from "./user/shared/interceptors/token-interceptor.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "./user/shared/guards/auth-guard.service";
import { UserModule } from "./user/user.module";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { RoleGuardService } from "./user/shared/guards/role-guard.service";
export function tokenGetter() {
  return localStorage.getItem("auth-token");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    UserModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PostService,
    AuthGuardService,
    RoleGuardService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
