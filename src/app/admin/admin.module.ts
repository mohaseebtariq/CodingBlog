import { routes } from "./admin.routing";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";
import { SideNavComponent } from "./shared/components/side-nav/side-nav.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CreatePostComponent } from "./components/create-post/create-post.component";

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    DashboardLayoutComponent,
    SideNavComponent,
    NavbarComponent,
    CreatePostComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, CKEditorModule]
})
export class AdminModule {}
