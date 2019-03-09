import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as firebase from "firebase/app";

import { AlbumModel } from "../models/Album";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private albumCollection: AngularFirestoreCollection<AlbumModel>;
  allAlbums: Observable<AlbumModel[]>;

  constructor(
    private readonly afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.albumCollection = this.afs.collection<AlbumModel>("albums");
  }

  getAllAlbums() {
    console.log("Get All Albums Called");
    // this.albumCollection = this.afs.collection<AlbumModel>(
    //   "albums"
    // );
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
}
