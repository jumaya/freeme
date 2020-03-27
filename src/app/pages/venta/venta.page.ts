import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {

  _token: string;  
  loading: any;
  @Input() fecha: string;
  result: any[] = new Array();  
  constructor(
    private LoadingCtrl: LoadingController,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.presentLoading('Cargando...').then(() => {
      this.getGrafica().then(() => {
        this.loading.dismiss();
      });
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.LoadingCtrl.create({
      message
    });
    return this.loading.present();
  }

  async getGrafica() {
    this._token = localStorage.getItem('token');
    this.dataService.getGraph(this._token).toPromise().then((res: any) => {      
      var resp = res.data.monthly.detail;
      this.fecha = res.data.monthly.summary.date
      this.result.push({
        'ingresos': res.data.monthly.summary.credit.amount,
        'gastos': res.data.monthly.summary.debit.amount,
        'vat_in': res.data.monthly.summary.credit.vat,
        'vat_gast': res.data.monthly.summary.debit.vat      
      })
      this.plotSimpleBarChart(resp.labels, resp.income, resp.expense);
    }).catch(err => {
      console.log(err);
      this.router.navigate(['/login/es']);
    });
  }

  plotSimpleBarChart(label, income, expense) {
    console.log(label)
    console.log(income)
    console.log(expense)
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
        split: true,
        valueSuffix: ' millions'
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
          name: 'Income',
          type: undefined,
          data: income,
          color: '#11d5ef'
        },
        
        {
          name: 'Expense',
          type: undefined,
          data: expense,
          color: '#e71d73'
        }]
    });
  }
}
