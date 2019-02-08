import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})

export class UserPage {
  dataHome: any;
  dataProfile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider, 
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.dataHome = JSON.parse(localStorage.home)

  }

  async ionViewDidEnter() {
    await this.checkToken()
    await this.loadProfile()
  }

  checkToken(){
    if (!localStorage.access_token) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  async loadProfile() {
    let parms = {
      access_token: localStorage.access_token
    }
    this.userProvider.loadProfile(parms).subscribe(async (data: any) => {
      console.log(data);
      this.dataProfile = data
      
    })
  }


  async logout(){
    await localStorage.removeItem('access_token')
    await localStorage.removeItem('member')
    this.checkToken()
  }



}
