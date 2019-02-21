import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EbookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EbookProvider {
  URL_EBOOK = 'https://bdn.go.th/thp/api/ebooks/'
  URL_FIRSTEBOOK = 'https://bdn.go.th/thp/api/firstebook/'
  URL_CATEGORYS = 'https://bdn.go.th/thp/api/categorys/'
  URL_SUBCATEGORYS = 'https://bdn.go.th/thp/api/subcategorys/'

  URL_SHERCH = 'https://bdn.go.th/thp/api/search/'
  

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
    return this.http.get(this.URL_EBOOK + '?cid=' + data.cid + '&gid=' + data.gid + '&page=' + data.page + '&access_token=' + data.access_token)
  }

  getCMS_ID(data) {
    return this.http.get(this.URL_EBOOK + '?cid=' + data.cid + '&gid=' + data.gid + '&type=getCMS_ID&access_token=' + data.access_token)
  }

  loadContent(data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_EBOOK + data.cms_id, JSON.stringify(data), { headers: headers })
  }
  
  loadFirstContent(data) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    return this.http.post(this.URL_FIRSTEBOOK, JSON.stringify(data), { headers: headers })
  }
  search(data) {
    return this.http.get(this.URL_SHERCH + '?catagory=' + data.catagory + '&subcatagory=' + data.subcatagory + '&keytype=' + data.keytype + '&search=' + data.search + '&searchby=' + data.searchby + '&page=' + data.page + '&access_token=' + data.access_token)
  }
}

