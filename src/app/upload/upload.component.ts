import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { DataService } from "../data.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { map, switchMap, finalize } from "rxjs/operators";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;
  fd = new FormData();

  @ViewChild("albumCover") albumCover;

  uploadError = "";
  image = null;
  reader;

  uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  downloadURL;

  // !! Fix Error when using validator for max/min length
  newAlbum = this.fb.group({
    artist: ["", Validators.required],
    album: ["", Validators.required],
    year: ["", Validators.required],
    credits: ["", Validators.required],
    image: ["", Validators.required]
  });

  // TODO: Dynamically add more 'credits' inputs on button and push them to an array before sending them to firebase

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private dataService: DataService,
    private storage: AngularFireStorage
  ) {
    this.downloadURL = this.dataService.downloadURL;
  }

  ngOnInit() {}

  imagePreview(event) {
    this.selectedFile = event.target.files[0];

    this.reader = new FileReader();

    this.reader.onload = e => {
      this.albumCover.nativeElement.src = e.target["result"];
    };
    this.reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit() {
    console.log("submitted");
    let uploadAlbum = this.newAlbum.value;
    uploadAlbum.image = this.selectedFile;

    this.dataService.uploadAlbum(uploadAlbum);
    this.uploadPercent = this.dataService.uploadPercent;
    // this.downloadURL = this.dataService.downloadURL;

    // const file = uploadAlbum.image;
    // const date = new Date().toISOString();

    // const filePath = `Originals/${file.name}-${date}`; // This is the name of the file to upload
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);

    // // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
    // // get notified when the download URL is available

    // task
    //   .snapshotChanges()
    //   .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
    //   .subscribe(value => {
    //     console.log(
    //       Math.round((value.bytesTransferred / value.totalBytes) * 100)
    //     );
    //     console.log(this.downloadURL);
    //   });
  }

  //  !! This is to a Firebase Function
  onUpload() {
    // const fd = new FormData();
    // this.fd.append("image", this.selectedFile, this.selectedFile.name);
    // this.http
    //   // !! Need to change <url>
    //   .post("<url>", fd, {
    //     reportProgress: true,
    //     observe: "events"
    //   })
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       console.log(
    //         "Upload Progress " +
    //           Math.round((event.loaded / event.total) * 100) +
    //           "%"
    //       );
    //     } else if (event.type === HttpEventType.Response) {
    //       console.log(event);
    //     }
    //   });
  }
}
