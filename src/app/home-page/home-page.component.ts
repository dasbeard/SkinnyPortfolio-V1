import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { AlbumModel } from "../../models/Album";

import { Observable } from "rxjs";
import { trigger, transition, style, animate, state, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  animations: [
    trigger('fadeIn', [

      transition('*<=>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('1s 1.3s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
            style({opacity: 0.75, transform: 'translateY(-10px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))
      ])
    ])  
  ]
})
export class HomePageComponent implements OnInit {
  allAlbums: AlbumModel[];

  constructor(private dataService: DataService) {
    this.dataService.getAllAlbums().subscribe(data => {
      this.allAlbums = data;
      // console.log(this.allAlbums);
    });
  }

  ngOnInit() {}
}
