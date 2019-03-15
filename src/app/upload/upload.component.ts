import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  FormArray
} from "@angular/forms";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  // @Input() inputArray: ArrayType[];
  // myForm: FormGroup;

  @ViewChild("albumCover") albumCover;

  selectedFile: File = null;

  uploadError = "";
  image = null;
  reader;

  showProgressBar: boolean = false;
  uploadPercent: Observable<number>;
  // uploadPercent: number;

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
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  imagePreview(event) {
    this.selectedFile = event.target.files[0];

    this.reader = new FileReader();

    this.reader.onload = e => {
      this.albumCover.nativeElement.src = e.target["result"];
    };
    this.reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit(formDirective: FormGroupDirective): void {
    // console.log("submitted");
    this.showProgressBar = true;
    let uploadAlbum = this.newAlbum.value;
    uploadAlbum.image = this.selectedFile;

    this.dataService.uploadAlbum(uploadAlbum);
    // this.uploadPercent = this.dataService.uploadPercent;
    this.dataService.uploadPercent.subscribe(data => {
      console.log(data);
      this.uploadPercent = this.dataService.uploadPercent;
      if (data === 100) {
        // this.openSnackBar();
      }
    });
    formDirective.resetForm();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(uploadSnackBar, {
      duration: 800
    });
  }
}

/* 
  !! Limits file size to smaller than 2MB

    if(this.files[0].size > 2097152){
       alert("File is too big!");
       this.value = "";
    };
*/

@Component({
  selector: "uploadSnackBar",
  templateUrl: "uploadSnackBar.html",
  styleUrls: ["./uploadSnackBar.css"]
})
export class uploadSnackBar {}
