import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatButtonToggleModule
} from "@angular/material";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

import { Keys } from "../../keys";

import { AppComponent } from "./app.component";
import { UploadComponent, uploadSnackBar } from "./upload/upload.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { BannerComponent } from "./banner/banner.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { AlbumComponent, AlbumDialog } from "./album/album.component";
import { ListAlbumsComponent } from "./list-albums/list-albums.component";
import { UploadLinkComponent } from "./upload-link/upload-link.component";
import { ListLinksComponent } from "./list-links/list-links.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AdminLinksComponent } from "./admin-links/admin-links.component";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    MainNavComponent,
    BannerComponent,
    HomePageComponent,
    AboutPageComponent,
    ContactPageComponent,
    AlbumComponent,
    AlbumDialog,
    uploadSnackBar,
    ListAlbumsComponent,
    UploadLinkComponent,
    ListLinksComponent,
    AdminPageComponent,
    AdminLinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(Keys.firebase),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlbumDialog, uploadSnackBar]
})
export class AppModule {}
