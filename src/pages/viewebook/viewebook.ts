import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  isFirst = false
  tabBarElement: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    
    this.dataEbook = this.navParams.data.data.data
    this.isFirst = this.navParams.data.ebooks
    console.log(this.navParams);
    
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    // document.querySelector("ion-tabbar")['style'].display = 'none';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewebookPage');
    this.viewCtrl.showBackButton(false); 
    this.tabBarElement.style.display = 'none';
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    
    this.tabBarElement.style.display = 'none';
  }

  async close(ebooks='false') {
    console.log(ebooks);
    
    this.tabBarElement.style.display = 'flex';
    if(ebooks == 'true'){
      this.navCtrl.parent.select(0)
      this.navCtrl.popToRoot()
    }else{
      
      this.tabBarElement.style.display = 'none';
      this.navCtrl.popToRoot()
    }
  }

  // ionViewWillLeave() {
  //   this.tabBarElement.style.display = 'flex';
  //   console.log('ionViewWillLeave');
  // }
}
