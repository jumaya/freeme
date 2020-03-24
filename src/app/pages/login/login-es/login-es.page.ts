import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-es',
  templateUrl: './login-es.page.html',
  styleUrls: ['./login-es.page.scss'],
})
export class LoginEsPage implements OnInit {

  constructor() { 
    localStorage.removeItem('language');    
  }

  ngOnInit() {
    localStorage.setItem('language', 'es');
  }

}
