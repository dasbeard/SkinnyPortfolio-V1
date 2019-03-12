import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map, switchMap, finalize } from "rxjs/operators";
import * as firebase from "firebase/app";

import { AlbumModel } from "../models/Album";
import { Image } from "src/models/image";
import {
  UploadTaskSnapshot,
  UploadTask
} from "@angular/fire/storage/interfaces";
import { TaskData } from "@angular/core/src/testability/testability";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private albumCollection: AngularFirestoreCollection<AlbumModel>;
  allAlbums: Observable<AlbumModel[]>;

  // For Image Upload
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private readonly afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.albumCollection = this.afs.collection<AlbumModel>("albums");
  }

  uploadAlbum(data) {
    // console.log(data);

    const file = data.image;
    const date = new Date().toISOString();

    const filePath = `Originals/${file.name}-${date}`; // This is the name of the file to upload
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
          console.log("test", this.downloadURL);
        })
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  getAllAlbums() {
    console.log("Get All Albums Called");
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

  addNewAlbum(data) {
    console.log(data);
  }
}
