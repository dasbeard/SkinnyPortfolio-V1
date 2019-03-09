import { Component, OnInit, Inject, Input } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { AlbumModel } from "src/models/Album";

export interface DialogData {
  album: AlbumModel;
}

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"]
})
export class AlbumComponent implements OnInit {
  @Input() albumInfo: AlbumModel;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(AlbumDialog, {
      minWidth: "50%",
      maxWidth: "85%",
      data: {
        album: this.albumInfo
      }
    });
  }
}

@Component({
  selector: "album-dialog",
  templateUrl: "./album-dialog.html",
  styleUrls: ["./album-dialog.css"]
})
export class AlbumDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
