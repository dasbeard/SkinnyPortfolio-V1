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
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from "@angular/forms/src/directives";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  // For Image Preview and Upload
  @ViewChild("albumCover") albumCover;
  selectedFile: File = null;
  image = null;
  reader;

  // Show Upload Progress
  showProgressBar: boolean = false;
  uploadPercent: Observable<number>;

  newAlbum: FormGroup;

  get moreCredits() {
    return this.newAlbum.get("moreCredits") as FormArray;
  }

  addCredit() {
    this.moreCredits.push(this.fb.control(" "));
  }

  // TODO: Dynamically add more 'credits' inputs on button and push them to an array before sending them to firebase

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // !! Fix Error when using validator for max/min length
    this.newAlbum = this.fb.group({
      artist: ["", Validators.required],
      album: ["", Validators.required],
      year: ["", Validators.required],
      credits: ["", Validators.required],
      image: ["", Validators.required],
      moreCredits: this.fb.array([])
    });
  }

  imagePreview(event) {
    this.selectedFile = event.target.files[0];

    this.reader = new FileReader();

    this.reader.onload = e => {
      this.albumCover.nativeElement.src = e.target["result"];
    };
    this.reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit(formData, formDirective: FormGroupDirective): void {
    console.log("submitted");
    this.showProgressBar = true;

    let uploadAlbum = {
      artist: this.newAlbum.value.artist,
      album: this.newAlbum.value.album,
      year: this.newAlbum.value.year,
      image: this.selectedFile,
      credits: []
    };

    let tempCredits = [this.newAlbum.value.credits];
    let tempCredits2 = this.newAlbum.value.moreCredits;

    uploadAlbum.credits = [...tempCredits, ...tempCredits2];

    this.dataService.uploadAlbum(uploadAlbum);
    this.dataService.uploadPercent.subscribe(data => {
      console.log(data);
      this.uploadPercent = this.dataService.uploadPercent;
      if (data === 100) {
        this.openSnackBar();
      }
    });
    formDirective.resetForm();
    this.reader = false;
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
