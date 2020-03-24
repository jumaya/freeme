import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-en',
  templateUrl: './login-en.page.html',
  styleUrls: ['./login-en.page.scss'],
})
export class LoginEnPage implements OnInit {

  constructor() { 
    localStorage.removeItem('language');    
  }

  ngOnInit() {
    localStorage.setItem('language', 'en');
  }

}
