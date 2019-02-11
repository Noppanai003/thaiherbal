import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html',
})
export class PolicyPage {

  dataHome: any
  dataPolicy: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PolicyPage');
    this.dataHome = JSON.parse(localStorage.home)
    this.loadPolicy()
  }

  async loadPolicy(){
    await this.userProvider.loadPolicy().subscribe(async (data: any) => {
      this.dataPolicy = data.policy[this.navParams.data.lang]
    })
  }

  close(){
    this.navCtrl.pop();
  }
}
