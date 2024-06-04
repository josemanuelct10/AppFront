import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-marisco',
  templateUrl: './show-marisco.component.html',
  styleUrl: './show-marisco.component.css'
})
export class ShowMariscoComponent {

  @Input() marisco: any;

  constructor(
    public modal: NgbActiveModal
  ){}

}
