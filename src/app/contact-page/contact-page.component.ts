import { Component, OnInit, OnDestroy } from '@angular/core';
import { slideRight } from '../animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  animations: [
    slideRight
  ]
})
export class ContactPageComponent implements OnInit {
  
  animate:boolean = false;

  constructor(private dataService: DataService) {
    this.animate = this.dataService.initialContact;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dataService.initialContact = true;
  }

}
