import { Componente } from './../configuration/config';
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

  getCuenta(token) {    
    return this.http.get('https://api7.cloudframework.io/freeme/mobile/users/myself',
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'X-DS-TOKEN': token
        }
      })
  }

  getGraph(token) {    
    return this.http.get('https://api7.cloudframework.io/freeme/mobile/users/myself/graph',
      {
        headers: {
          'X-WEB-KEY': 'Production',
          'X-DS-TOKEN': token
        }
      })
  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }
   
}
