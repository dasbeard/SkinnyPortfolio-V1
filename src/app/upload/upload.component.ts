import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;

  @ViewChild("albumCover") albumCover;

  uploadError = "";
  image = null;
  reader;

  newAlbum = this.fb.group({
    artist: ["", Validators.required],
    album: ["", Validators.required],
    year: ["", Validators.required],
    credits: ["", Validators.required],
    image: ["", Validators.required]
  });

  // TODO: Dynamically add more 'credits' inputs on button and push them to an array before sending them to firebase

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {}

  imagePreview(event) {
    this.reader = new FileReader();

    this.reader.onload = e => {
      this.albumCover.nativeElement.src = e.target["result"];
    };
    this.reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit() {
    console.log("submitted");
    console.log(this.newAlbum);
  }

  //  !! This is to a Firebase Function
  onUpload() {
    // const fd = new FormData();
    // fd.append("image", this.selectedFile, this.selectedFile.name);
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
