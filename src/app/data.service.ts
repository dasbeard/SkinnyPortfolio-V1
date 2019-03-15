import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { AlbumModel } from "../models/Album";

import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private albumCollection: AngularFirestoreCollection<AlbumModel>;
  allAlbums: Observable<AlbumModel[]>;
  singleAlbum: AngularFirestoreDocument<AlbumModel>;

  // For Image Upload
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  URL: string;

  private basePath: string = "uploads";
  private uploadTask: firebase.storage.UploadTask;
  newUploadPercent: number;

  constructor(
    private readonly afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.albumCollection = this.afs.collection<AlbumModel>("albums");
  }

  //  !! Not working with larger files
  uploadAlbum(data) {
    // console.log(data);

    const file = data.image;
    const date = new Date().toISOString();

    const filePath = `Originals/${data.artist}-${data.album}-${date}`; // This is the name of the file to upload
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          console.log(this.downloadURL);

          this.printURL(data);
          console.log("finaly");
        })
      )
      .subscribe();
  }

  async printURL(albumData) {
    console.log("printing URL");

    this.downloadURL.subscribe(async newUrl => {
      console.log(await newUrl);
      albumData.image = newUrl;

      this.albumCollection.add(albumData);
    });
  }

  getAllAlbums() {
    // console.log("Get All Albums Called");
    this.allAlbums = this.albumCollection.snapshotChanges().pipe(
      map(action =>
        action.map(a => {
          const data = a.payload.doc.data() as AlbumModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.allAlbums;
  }

  deleteAlbum(albumID) {
    this.singleAlbum = this.afs.doc(`albums/${albumID}`);
    this.singleAlbum.delete();
  }
}
