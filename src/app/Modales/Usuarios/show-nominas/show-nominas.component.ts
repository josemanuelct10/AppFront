import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-nominas',
  templateUrl: './show-nominas.component.html',
  styleUrl: './show-nominas.component.css'
})
export class ShowNominasComponent implements OnInit {


  ngOnInit(): void {
    console.log(">>>>>>>",this.usuario);
  }
  @Input() usuario: any;
}
