import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  animal: "unicorn" | "panda" | "lion";
}

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"]
})
export class AlbumComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(AlbumDialog, {
      width: "50%",

      data: {
        animal: "panda"
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
