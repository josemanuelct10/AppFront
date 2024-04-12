import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rm-usuario',
  templateUrl: './rm-usuario.component.html',
  styleUrl: './rm-usuario.component.css'
})
export class RmUsuarioComponent {

  @Input() id: any;
  @Input() nombre: any;

}
