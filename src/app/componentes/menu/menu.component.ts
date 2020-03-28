/**
 * @fileoverview Componente que permite visualizar los elementos del menu principal. * 
 * @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/
import { DataService } from './../../services/data.service';
import { Componente } from './../../configuration/config';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

   /**
  * Propiedad que permite renderizar los item del menu
  * @type {Observable}
  */
  componentes: Observable<Componente[]>;

  constructor( private dataService: DataService ) { }

  /**
  * Metodo que inicializa el formulario, donde se cargan los item del menu principal con el llamado al servicio.
  * @type {Observable}
  */
  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

}
