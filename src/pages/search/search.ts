import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
  form = {
    catagory: '',
    subcatagory: '',
    keytype: '',
    search: '',
    searchby: 'some',
    page: 1,
    access_token: localStorage.access_token
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  search() {
    this.viewCtrl.dismiss(this.form)
  }
  
  close() {
    this.viewCtrl.dismiss()
  }
}
