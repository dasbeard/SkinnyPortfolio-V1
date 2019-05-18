import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { AlbumModel } from "../../models/Album";
// import { Observable } from "rxjs";
import { trigger, style, state } from '@angular/animations';
import { albumAnimationTransition } from '../animations';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  animations: [
    trigger('fadeIn', [

      state('for', style({
      }), {params: {timing1: 'timing'}}), // default parameters values required
      
      albumAnimationTransition

    ])
   
  ]
})


export class HomePageComponent implements OnInit {
  allAlbums: AlbumModel[];
  animate:boolean = false;
  timing: string = '1.2s';

  constructor(private dataService: DataService) {
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
      if (this.dataService.initialHome){
        this.timing = '.05s'
      }
    });
  }

  ngOnInit() {}
}
