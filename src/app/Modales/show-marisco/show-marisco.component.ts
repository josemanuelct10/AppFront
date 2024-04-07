import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-marisco',
  templateUrl: './show-marisco.component.html',
  styleUrl: './show-marisco.component.css'
})
export class ShowMariscoComponent {

  @Input() marisco: any;

}
