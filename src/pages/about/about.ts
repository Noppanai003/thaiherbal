import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  dataHome: any;

  constructor(
    public navCtrl: NavController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.dataHome = JSON.parse(localStorage.home)
  }
  
  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }
}
