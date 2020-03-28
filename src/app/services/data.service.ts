/**
* @fileoverview Servicio que permite ralizar las consultas necesaria al aplicativo
* @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/
import { Componente } from './../configuration/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../configuration/config';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
  * Elemento que obtiene la url principal para realizar la consulta
  * @type {string}
  */
  ApiUrl = config.ApiUrl;

  /** @constructor */
  constructor(
    private http: HttpClient) { }

  /**
  * Metodo que permite cargar el objeto LoadingController 
  * @param  {json}
  * @return  {Array}
  */
  login(data) {
    /* Se envia la data con la informacion requerida para el inicio de sesion */
    return this.http.post(this.ApiUrl + '/in',
      {
        user: data.user,
        password: data.password,
        type: data.type
      },
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  }

  /**
  * Metodo que permite obtener la consulta con la informacion de la cuenta de usuario
  * @param  {string}
  * @return  {Array}
  */
  getCuenta(token) {
    /* Se envia el token como parametro en los headers para recibir informacion de la consulta */
    return this.http.get(this.ApiUrl + '/users/myself',
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'X-DS-TOKEN': token
        }
      })
  }

  /**
  * Metodo que permite obtener la consulta con la informacion de la grafica para facturacion y ventas
  * @param  {string}
  * @return  {Array}
  */
  getGraph(token) {
    return this.http.get(this.ApiUrl + '/users/myself/graph',
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'X-DS-TOKEN': token
        }
      })
  }

  /**
  * Metodo que obtiene los elementos del menu principal. 
  * @param  {json}
  * @return  {Array}
  */
  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

}
