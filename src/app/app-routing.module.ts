import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
    children: []
  },
  {
    path: "upload",
    pathMatch: "full",
    component: UploadComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
