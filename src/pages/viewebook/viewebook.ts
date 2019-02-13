import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the ViewebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewebook',
  templateUrl: 'viewebook.html',
})
export class ViewebookPage {

  dataEbook: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    
    this.dataEbook = this.navParams.data.data.data
    console.log(this.dataEbook);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewebookPage');
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
  }

  async close() {
    this.navCtrl.pop()
  }

}
