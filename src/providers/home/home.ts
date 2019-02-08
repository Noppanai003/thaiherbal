import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {
  URL_HOME = 'http://wewebplaza.com/thaiherbal/api/home';
  // URL_REGISTER = 'http://localhost/wwp/actionRegister.php';
  constructor(public http: HttpClient) {
    console.log('Hello HomeProvider Provider');
  }


  loadHome() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.get(this.URL_HOME)
  }

}
