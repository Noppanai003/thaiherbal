import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  URL_LOGIN = 'http://wewebplaza.com/thaiherbal/api/login';
  URL_PROFILE = 'http://wewebplaza.com/thaiherbal/api/profile';
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  login(data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_LOGIN,JSON.stringify(data), { headers: headers })
  }

  loadProfile(data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_PROFILE,JSON.stringify(data), { headers: headers })
  }

  uploadPhoto(data) {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post("http://wewebplaza.com/thaiherbal/api/upload?type=add&key=mem",data)
  }

}
