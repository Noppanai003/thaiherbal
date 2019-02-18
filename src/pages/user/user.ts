import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import * as $ from "jquery";
import { EditprofilePage } from '../editprofile/editprofile';
import { EditpasswordPage } from '../editpassword/editpassword';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
  loadPage = false
  tabBarElement: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public modalController: ModalController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.dataHome = JSON.parse(localStorage.home)
    this.tabBarElement.style.display = 'flex';

  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    await this.checkToken()
    await this.loadProfile()
    this.loadPage = true
  }

  async checkToken() {
    if (!localStorage.access_token) {
      // const modal = await this.modalController.create(LoginPage);
      // return await modal.present();
      this.navCtrl.setRoot(LoginPage);
    }
  }

  async loadProfile() {
    let parms = {
      access_token: localStorage.access_token
    }
    this.userProvider.loadProfile(parms).subscribe(async (data: any) => {
      // console.log(data);
      this.dataProfile = data

    })

  }

  image: any;
  async upload(str: any) {
    await this.checkToken()
    const formData = new FormData();
    this.image = str.target.files[0];
    formData.append('uploadProfile', this.image);
    formData.append('keyProfile', 'mem');
    formData.append('access_token', localStorage.access_token);
    await this.userProvider.uploadPhoto(formData).subscribe(async (data: any) => {
      if (!data.status) {
        alert(data.message)
      } else {
        await this.loadProfile()
      }
    })
  }

  clickuploadProfile() {
    $('#files').click();
  }

  async logout() {
    await localStorage.removeItem('access_token')
    await localStorage.removeItem('member')
    this.checkToken()
  }

  async editProfile() {
    // this.navCtrl.push(ForgotpassPage);
    const modal = await this.modalController.create(EditprofilePage);
    return await modal.present();
  }

  async editPass() {
    // this.navCtrl.push(ForgotpassPage);
    const modal = await this.modalController.create(EditpasswordPage);
    return await modal.present();
  }
}
