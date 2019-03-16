import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroupDirective,
  FormGroup,
  Validators
} from "@angular/forms";
import { DataService } from "../data.service";
import { LinkModel } from "src/models/linkModel";

@Component({
  selector: "app-upload-link",
  templateUrl: "./upload-link.component.html",
  styleUrls: ["./upload-link.component.css"]
})
export class UploadLinkComponent implements OnInit {
  newLink: FormGroup;
  allLinks: LinkModel[];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.newLink = this.fb.group({
      url: ["", Validators.required],
      title: ["", Validators.required]
    });

    // this.dataService.getAllLinks().subscribe(links => {
    //   this.allLinks = links;
    //   console.log(links);
    // });
  }

  onSubmit(newLink, formDirective: FormGroupDirective): void {
    // console.log("submitted");
    // console.log(newLink.value);
    this.dataService.addNewLink(newLink.value);

    formDirective.resetForm();
  }
}
