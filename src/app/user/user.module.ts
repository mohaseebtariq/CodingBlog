import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../user/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './user.routing';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BlNavbarComponent } from './shared/components/bl-navbar/bl-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowScrollDirective } from './shared/Directives/window-scroll.directive';
import { RegisterComponent } from './components/register/register.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

@NgModule({
  declarations: [
    BlNavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    WindowScrollDirective,
    UserLayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
