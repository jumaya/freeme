import { Componente, Mensaje } from './../configuration/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../configuration/config';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  language = config.message;

  constructor(
    private http: HttpClient) { }

  login(data) {
    return this.http.post('https://api7.cloudframework.io/freeme/mobile/in',
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

  getCuenta() {    
    return this.http.get('https://api7.cloudframework.io/freeme/mobile/users/myself',
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'X-DS-TOKEN': localStorage.getItem('token')
        }
      })
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getErrorMessages() {
    console.log(this.language)
    if (this.language == 'en') {
      return this.http.get<Mensaje[]>('/assets/data/error_en.json');
    } else {
      return this.http.get<Mensaje[]>('/assets/data/error_es.json');
    }
  }
}
