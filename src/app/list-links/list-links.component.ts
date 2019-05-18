import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "../data.service";
import { LinkModel } from "../../models/linkModel";

import { trigger, style, state } from '@angular/animations';
import { albumAnimationTransition } from '../animations';


@Component({
  selector: "app-list-links",
  templateUrl: "./list-links.component.html",
  styleUrls: ["./list-links.component.css"],
  animations: [
    
    trigger('fadeIn', [

      state('for', style({
      }), {params: {timing1: 'timing'}}), // default parameters values required
      
      albumAnimationTransition

    ])

  ]
})
export class ListLinksComponent implements OnInit {
  allLinks: LinkModel[];
  timing:string = '.1s';
  animate:boolean = false;


  constructor(private dataService: DataService) {
    this.animate = this.dataService.initialLinks;
  }

  ngOnInit() {
    this.dataService.getAllLinks().subscribe(links => {
      this.allLinks = links;
    });
  }

  ngOnDestroy(){
    this.dataService.initialLinks = true;
  }



}

// if (this.dataService.initialLinks){
//   this.animate = true;
// }