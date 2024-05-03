import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-gastos',
  templateUrl: './show-gastos.component.html',
  styleUrl: './show-gastos.component.css'
})
export class ShowGastosComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.proveedor);
  }

  @Input() proveedor: any;




}
