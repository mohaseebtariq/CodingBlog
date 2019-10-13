import { routes } from './admin.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
  declarations: [DashboardComponent, SideNavComponent, DashboardLayoutComponent, SideNavComponent, NavbarComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AdminModule { }
