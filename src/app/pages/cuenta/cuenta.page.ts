/**
* @fileoverview Pagina donde se visualiza el formulario de tu cuenta y todas sus operaciones * 
* @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  /**
  * Array en donde se almacena los datos del usuario logueado
  * @type {Array}
  */
  result: any[] = new Array();

  /**
  * Objeto que invoca al LoadingController de IONIC
  * @type {any}
  */
  loading: any;

  /**
  * Propiedad donde se almacena el token del usuario logueado
  * @type {string}
  */
  _token: string;

  /** @constructor */
  constructor(
    private dataService: DataService,
    private router: Router,
    private LoadingCtrl: LoadingController,
  ) { }

  /**
  * Metodo iniciliziador del formulario 
  */
  ngOnInit() {

    /* LLama al loading hasta que se carguen los datos del usuario */
    this.presentLoading('Cargando...').then(() => {
      this.getCuenta().then(() => {
        this.loading.dismiss();
      });
    });

  }

  /**
  * Metodo que permite cargar el objeto LoadingController 
  * @param  {string}
  * @return  {LoadingController}
  */
  async presentLoading(message: string) {
    this.loading = await this.LoadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  /**
  * Metodo que permite obtener los datos del usuario loagueado a partir del llamado al servicio 
  * @return  {void}
  */
  async getCuenta() {

    /* Se obtiene el token del storage */
    this._token = localStorage.getItem('token');

    /* LLamado al servicio enviando como parametro el token */
    this.dataService.getCuenta(this._token).toPromise().then((res: any) => {
      /* Se guarda en el array el resultado al servicio invocado */
      this.result.push({
        'name': res.data.User.name,
        'email': res.data.User.email,
        'telefono': res.data.User.mobile,
        'nif': res.data.User.document_id,
        'direccion': res.data.User.address,
        'cod_postal': res.data.User.postalcode,
        'irpf': res.data.User.irpf,
        'contra': res.data.User.password,
        'income': res.data.Balance.income,
        'expense': res.data.Balance.expense
      })
    }).catch(err => {
      /* Si se produce un error se vuelve al formulario de incio de sesion 
      para obtener info del token */
      console.log(err);
      this.router.navigate(['/login/es']);
    });
  }
}
