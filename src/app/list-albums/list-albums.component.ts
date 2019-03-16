import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../data.service";
import { AlbumModel } from "../../models/Album";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "app-list-albums",
  templateUrl: "./list-albums.component.html",
  styleUrls: ["./list-albums.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ListAlbumsComponent implements OnInit {
  allAlbums: AlbumModel[];
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["cover", "artist", "album", "year", "delete"];
  expandedElement: AlbumModel | null;

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
