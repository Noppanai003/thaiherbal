import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TabsPage } from '../tabs/tabs';
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
    // console.log(this.navParams);

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    
    if(this.tabBarElement) this.tabBarElement.style.display = 'none';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewebookPage');
    this.viewCtrl.showBackButton(false);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    if(this.tabBarElement) this.tabBarElement.style.display = 'none';
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    if(this.tabBarElement) this.tabBarElement.style.display = 'none';
    this.checkToken()
  }

  async close(ebooks = 'false') {
    console.log(ebooks);
    if(this.tabBarElement) this.tabBarElement.style.display = 'flex';
    else{
      this.navCtrl.setRoot(TabsPage)
      return true;
    }
    if (ebooks == 'true') {
      // this.navCtrl.push(HomePage)
      this.navCtrl.parent.select(0)
    } else {
      // this.tabBarElement.style.display = 'none';
      // this.navCtrl.popToRoot()
      this.navCtrl.setRoot(TabsPage)
    }
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    if(this.tabBarElement) this.tabBarElement.style.display = 'flex';
    console.log('ionViewWillLeave');
  }

  async checkToken() {
    if (!localStorage.access_token) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // this.tabBarElement.style.display = 'flex';
      if(this.isFirst) this.navCtrl.parent.select(4);
      else this.navCtrl.setRoot(TabsPage)
    }
  }
}
