import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { ListAlbumsComponent } from "./list-albums/list-albums.component";
import { UploadLinkComponent } from "./upload-link/upload-link.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AdminLinksComponent } from "./admin-links/admin-links.component";
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminAlbumsComponent } from './admin-albums/admin-albums.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
    children: []
  },
  {
    path: "about",
    pathMatch: "full",
    component: AboutPageComponent,
    children: []
  },
  {
    path: "contact",
    pathMatch: "full",
    component: ContactPageComponent,
    children: []
  },
  {
    path: "admin",
    component: AdminLoginComponent,
    children: [
      { path: "", component: UploadComponent },
      { path: "uploadLink", component: UploadLinkComponent },
      { path: "listAlbums", component: ListAlbumsComponent },
      { path: "listLinks", component: AdminLinksComponent }
    ]
  },

  {
    path: "**",
    component: HomePageComponent
  }
  // {
  //   path: "upload",
  //   pathMatch: "full",
  //   component: UploadComponent,
  //   children: []
  // },
  // {
  //   path: "listAlbum",
  //   pathMatch: "full",
  //   component: ListAlbumsComponent,
  //   children: []
  // },
  // {
  //   path: "uploadLink",
  //   pathMatch: "full",
  //   component: UploadLinkComponent,
  //   children: []
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
