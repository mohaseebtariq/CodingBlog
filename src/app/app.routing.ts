import { Routes } from "@angular/router";
import { RoleGuardService } from "./user/shared/guards/role-guard.service";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./user/user.module").then(mod => mod.UserModule)
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then(mod => mod.AdminModule),
    canActivate: [RoleGuardService],
    data: { role: "user" }
  }
];
