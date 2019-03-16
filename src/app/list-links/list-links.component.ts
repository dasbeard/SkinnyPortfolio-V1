import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { LinkModel } from "../../models/linkModel";

@Component({
  selector: "app-list-links",
  templateUrl: "./list-links.component.html",
  styleUrls: ["./list-links.component.css"]
})
export class ListLinksComponent implements OnInit {
  allLinks: LinkModel[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllLinks().subscribe(links => {
      this.allLinks = links;
      // console.log(links);
    });
  }
}
