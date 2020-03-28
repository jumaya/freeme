/**
 * @fileoverview Componente que permite visualizar el encabezado de las páginas. * 
 * @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  /**
  * Propiedad que recibe la ruta donde se redirige el header
  * @type {string}
  */
  @Input() ruta: string;

  /**
  * Propiedades que recibe el titulo del header
  * @type {string}
  */
  @Input() titulo: string;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {}

   /**
  * Meotodo que permite cambiar de lenguaje por el seleccionado en el formulario
  * @param  {string}
  * @return  {void}
  */
  choose(lang) {
    this.translateService.use(lang);
  }

}
