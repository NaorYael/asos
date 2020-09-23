import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations:[
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})

export class SliderComponent implements OnInit {

  current = 0;
  img_list = [

    'assets/images/products/slider/1.jpg',
    'assets/images/products/slider/2.png'

  ];

  ngOnInit() {
    setInterval(() => {
      this.current = ++this.current % this.img_list.length;
    }, 2000);
  }

}
