import { Componente, Mensaje } from './../configuration/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../configuration/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  language = config.message;

  constructor(
    private http: HttpClient) { }

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
