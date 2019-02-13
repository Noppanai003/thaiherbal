import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  URL_LOGIN = 'https://bdn.go.th/thp/api/login';
  URL_FORGOT = 'https://bdn.go.th/thp/api/forgot';
  URL_PROFILE = 'https://bdn.go.th/thp/api/profile';
  URL_EDITPROFILE = 'https://bdn.go.th/thp/api/editprofile';
  URL_EDITPASS = 'https://bdn.go.th/thp/api/editpass';
  URL_REGISTER = 'https://bdn.go.th/thp/api/register';
  URL_UPLOAD_PROFILE = 'https://bdn.go.th/thp/api/upload?type=add&key=mem';
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

  register(data){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_REGISTER,JSON.stringify(data), { headers: headers })
  }

  editpass(data){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_EDITPASS,JSON.stringify(data), { headers: headers })
  }

  editprofile(data){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_EDITPROFILE,JSON.stringify(data), { headers: headers })
  }

  forgot(data){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_FORGOT,JSON.stringify(data), { headers: headers })
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
    return this.http.post(this.URL_UPLOAD_PROFILE,data)
  }

  loadPolicy() {
    return this.http.get(this.URL_REGISTER)
  }

  loadRegister() {
    return this.http.get(this.URL_REGISTER)
  }

  loadEditprofile() {
    return this.http.get(this.URL_REGISTER)
  }

}
