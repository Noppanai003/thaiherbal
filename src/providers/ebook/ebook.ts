import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EbookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EbookProvider {
  URL_EBOOK = 'http://wewebplaza.com/thaiherbal/api/ebooks/'

  URL_CATEGORYS = 'http://wewebplaza.com/thaiherbal/api/categorys/'
  URL_SUBCATEGORYS = 'http://wewebplaza.com/thaiherbal/api/subcategorys/'

  constructor(public http: HttpClient) {
    console.log('Hello EbookProvider Provider');
  }

  loadCategory(data) {
    return this.http.get(this.URL_CATEGORYS + '?access_token=' + data.access_token)
  }

  loadSubCategory(data) {
    return this.http.get(this.URL_SUBCATEGORYS + '?cid=' + data.cid + '&access_token=' + data.access_token)
  }

  loadListContent(data) {
    return this.http.get(this.URL_EBOOK + '?cid=' + data.cid + '&gid=' + data.gid + '&access_token=' + data.access_token)
  }

  getCMS_ID(data) {
    return this.http.get(this.URL_EBOOK + '?cid=' + data.cid + '&type=getCMS_ID&access_token=' + data.access_token)
  }

  loadContent(data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_EBOOK + data.cms_id, JSON.stringify(data), { headers: headers })
  }
}

