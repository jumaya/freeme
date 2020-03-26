import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  cuenta: Observable<any>;
  result: any[] = new Array();


  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getCuenta().toPromise().then((res: any) => {
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
