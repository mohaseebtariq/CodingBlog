import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { AuthGuardService } from "../user/shared/guards/auth-guard.service";
import { RoleGuardService } from "../user/shared/guards/role-guard.service";

export const routes: Routes = [
  {
    path: "admin",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "create-post",
        component: CreatePostComponent
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  }
];
