/**
* @fileoverview Pagina donde se visualiza el formulario de facturacion y venta y todas sus operaciones * 
* @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  /**
  * Propiedad donde se almacena el token del usuario logueado
  * @type {string}
  */
  _token: string;

  /**
  * Objeto que invoca al LoadingController de IONIC
  * @type {any}
  */
  loading: any;

  @Input() fecha: string;

  /**
  * Array en donde se almacena los datos de facturacion y ventas
  * @type {Array}
  */
  result: any[] = new Array();

  /** @constructor */
  constructor(
    private LoadingCtrl: LoadingController,
    private dataService: DataService,
    private router: Router,
  ) { }


  /**
  * Metodo iniciliziador del formulario donde se visualiza el Loading
  */
  ngOnInit() {
    /* Se visualiza el loading hasta que se complete la consulta */
    this.presentLoading('Cargando...').then(() => {
      this.getGrafica().then(() => {
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
  * Metodo que permite obtener los datos de la consulta para realizar la grafica
  * @return  {void}
  */
  async getGrafica() {

    /* Se obtiene el token del storage */
    this._token = localStorage.getItem('token');

    /* LLamado al servicio de obtener grafica enviando como parametro el token de usuario */
    this.dataService.getGraph(this._token).toPromise().then((res: any) => {
      var resp = res.data.monthly.detail;
      var fec = new Date(res.data.monthly.summary.date);      
      this.fecha = fec.getFullYear()+'-'+ (fec.getUTCMonth()+1).toString();
      this.result.push({
        'ingresos': res.data.monthly.summary.credit.amount,
        'gastos': res.data.monthly.summary.debit.amount,
        'vat_in': res.data.monthly.summary.credit.vat,
        'vat_gast': res.data.monthly.summary.debit.vat
      })

      /* LLamado al metodo de higchart para graficar segun los datos obtenidos */
      this.plotSimpleBarChart(resp.labels, resp.income, resp.expense);

    }).catch(err => {
      console.log(err);
      this.router.navigate(['/login/es']);
    });
  }

  /**
  * Metodo que permite realizar la grafica de area segun los datos obtenidos en la consulta
  * @param  {array} 
  * @param  {array}
  * @param  {array}
  * @return {object}
  */
  plotSimpleBarChart(label, income, expense) {
    HighCharts.chart('highcharts', {
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: label,
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      tooltip: {
        split: true
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: 'transparent',
          lineWidth: 1,
          marker: {
            lineWidth: 2,
            lineColor: '#797B7E',
            radius: 1
          }
        }
      },

      series: [
        {
          name: '',
          type: undefined,
          data: income,
          color: '#11d5ef'
        },

        {
          name: '',
          type: undefined,
          data: expense,
          color: '#e71d73'
        }]
    });
  }
}
