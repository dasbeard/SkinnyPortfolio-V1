import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit {
  selectedFile: File = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("<url>", fd, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "Upload Progress " +
              Math.round((event.loaded / event.total) * 100) +
              "%"
          );
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  }
}
