import { routes } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { PostService } from './user/shared/services/post.service';
import { TokenInterceptorService } from './user/shared/interceptors/token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './user/shared/guards/auth-guard.service';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UserModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ PostService, AuthGuardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
