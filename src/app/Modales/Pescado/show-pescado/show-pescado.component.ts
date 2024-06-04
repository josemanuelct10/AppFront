import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-pescado',
  templateUrl: './show-pescado.component.html',
  styleUrl: './show-pescado.component.css'
})
export class ShowPescadoComponent {
  @Input() pescado: any;

  constructor(
    public modal: NgbActiveModal
  ){}




}
