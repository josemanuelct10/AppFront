import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css']
})
export class CardProductoComponent {
  @Input() productos: any[];
  page: number;

  constructor() {}



}
