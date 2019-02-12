import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  dataHome: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  close() {
    let option = {
      name: 'Test',
      id: 191
    }
    this.viewCtrl.dismiss(option)
  }
}
