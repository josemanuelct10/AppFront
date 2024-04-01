import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrl: './secciones.component.css'
})
export class SeccionesComponent {
  @Input() image: string;
  @Input() alt: string;
  @Input() title: string;
  @Input() description: string;
  @Input() route: string;

}
