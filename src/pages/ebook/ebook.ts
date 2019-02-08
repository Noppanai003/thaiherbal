import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the EbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ebook',
  templateUrl: 'ebook.html',
})
export class EbookPage {
  dataHome: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad EbookPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  ionViewDidEnter(){
    if (!localStorage.access_token) {
      // console.log(this.navCtrl.parent.getByIndex(4))
      this.navCtrl.parent.select(4);
    }
    
  }

  

  

}
