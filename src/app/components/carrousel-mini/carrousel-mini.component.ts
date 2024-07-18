import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import {register as registerSwiperElements } from 'swiper/element/bundle'




@Component({
  selector: 'app-carrousel-mini',
  standalone: true,
  imports: [],
  templateUrl: './carrousel-mini.component.html',
  styleUrls: ['./carrousel-mini.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarrouselMiniComponent {

}

registerSwiperElements()
