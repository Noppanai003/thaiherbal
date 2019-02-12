import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  dataHome: any;

  constructor(
    public navCtrl: NavController,
  ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.dataHome = JSON.parse(localStorage.home)
  }

}
