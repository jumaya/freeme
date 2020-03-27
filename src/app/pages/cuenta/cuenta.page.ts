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

  cuenta: Observable<any>;
  result: any[] = new Array();
  loading: any;
  _token: string;  

  constructor(
    private dataService: DataService,
    private router: Router,
    private LoadingCtrl: LoadingController,
  ) { }

  ngOnInit() {    
    this.presentLoading('Cargando...').then(() => {
      this.getCuenta().then(() => {
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

  async getCuentaLocal() {
    this.result.push({
      'name': 'Usuario test prueba developer',
      'email': 'ionic@freeme.es',
      'telefono': '627550757',
      'nif': '111111H',
      'direccion': 'Calle Serrano 8',
      'cod_postal': '28081',
      'irpf': '7',
      'contra': null,
      'income': '1230.98',
      'expense': '238.99',
    })
  }

  async getCuenta() {
    this._token = localStorage.getItem('token');
    this.dataService.getCuenta(this._token).toPromise().then((res: any) => {
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
      console.log(err);
      this.router.navigate(['/login/es']);
    });
  }
}
