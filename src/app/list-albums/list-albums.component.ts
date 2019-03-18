import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../data.service";
import { AlbumModel } from "../../models/Album";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-list-albums",
  templateUrl: "./list-albums.component.html",
  styleUrls: ["./list-albums.component.css"]
})
export class ListAlbumsComponent implements OnInit {
  allAlbums: AlbumModel[];
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["cover", "artist", "album", "year", "delete"];

  constructor(private dataService: DataService) {
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
    });
  }
  ngOnInit() {}

  delete(id) {
    this.dataService.deleteAlbum(id);
  }
}
