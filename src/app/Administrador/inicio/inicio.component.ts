import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../Services/inicio-sesion.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  menuType: string;


  constructor(
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.menuType = data['menuType'];
    });
  }

}
