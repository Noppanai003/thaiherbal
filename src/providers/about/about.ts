import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AboutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AboutProvider {
  URL_HOME = 'http://192.168.1.129:5656/thb/api/home';
  constructor(public http: HttpClient) {
    console.log('Hello AboutProvider Provider');
  }

  loadAbout() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.get(this.URL_HOME)
  }
}
