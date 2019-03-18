import { Component, OnInit, ViewChild } from "@angular/core";
import { LinkModel } from "src/models/linkModel";
import { DataService } from "../data.service";

@Component({
  selector: "app-admin-links",
  templateUrl: "./admin-links.component.html",
  styleUrls: ["./admin-links.component.css"]
})
export class AdminLinksComponent implements OnInit {
  allLinks: LinkModel[];

  displayedColumns: string[] = ["Title", "Link", "Description", "Delete"];

  constructor(private dataService: DataService) {
    this.dataService.getAllLinks().subscribe(links => {
      this.allLinks = links;
      // console.log(this.allLinks);
    });
  }

  ngOnInit() {}

  deleteLink(id: string) {
    this.dataService.deleteLink(id);
  }
}
