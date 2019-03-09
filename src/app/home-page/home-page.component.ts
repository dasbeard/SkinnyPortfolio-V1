import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { AlbumModel } from "src/models/Album";
import { Observable } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  allAlbums: AlbumModel[];

  constructor(private dataService: DataService) {
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
      console.log(this.allAlbums);
    });
  }

  ngOnInit() {}
}
