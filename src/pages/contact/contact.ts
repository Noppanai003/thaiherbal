import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  dataHome: any;
  tabBarElement: any
  constructor(
    public navCtrl: NavController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
    
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.dataHome = JSON.parse(localStorage.home)
    
    this.tabBarElement.style.display = 'flex';
  }
  
  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }
}
