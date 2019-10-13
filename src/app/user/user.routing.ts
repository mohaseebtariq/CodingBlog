import { Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'auth/login',
        component: LoginComponent
      },
      {
        path: 'auth/register',
        component: RegisterComponent
      },
      {
        path: 'auth',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      }
    ]
  }
]
