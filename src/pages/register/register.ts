import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  dataHome: any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  register(){
    alert('หยอกๆหลอกว่า สำเร็จ!')
  }

  close() {
    this.navCtrl.pop();
  }
}
