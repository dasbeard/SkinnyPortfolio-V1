import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`user/${user.uid}`);

    const data = {
      uid: user.uid
    };
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }
}
