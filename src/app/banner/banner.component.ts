import { Component, OnInit } from "@angular/core";
import { trigger, style, animate, transition, keyframes } from '@angular/animations';


@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"],
  animations: [
    trigger('slide', [

      transition('*<=>*', [ 
        style({opacity: 0}),
          animate('1.3s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(95%) translateY(60%) scale(2)' }),
            style({opacity: 0.99, transform: 'translateX(95%) translateY(60%) scale(2)' }),
            style({opacity: 1, transform: 'translateX(0) translateY(0) scale(1)' })
          ]))
      ])
    ]),
    
    
    trigger('fadeIn', [

      transition('*<=>*', [ 
        style({opacity: 0}),
          animate('.6s 1.2s ease-in', style({opacity: 1}))
      ])
    ])  



  ]

})
export class BannerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
