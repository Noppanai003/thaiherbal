import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserPage } from '../user/user';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  dataHome: any
  // @ViewChild('member_login_email') member_login_email;
  // @ViewChild('password') password;
  formLogin = {
    member_login_email: 'd055222148@gmail.com',
    member_login_password: 'Q6ny2ojn',
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public modalController: ModalController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.checkToken()
    this.dataHome = JSON.parse(localStorage.home);

    // setTimeout(() => {
    // }, 1000);
  }

  checkToken() {
    if (localStorage.access_token) {
      this.navCtrl.setRoot(UserPage);
    }
  }

  async login() {
    let regExr = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    let result = regExr.test(this.formLogin.member_login_password);
    if (!result) {
      alert('โปรดกรอกรูปแบบข้อมูลให้ถูกต้อง')
      return false;
    }


    // this.password.setFocus();
    // console.log("this.formLogin", this.formLogin);
    if (this.formLogin.member_login_email && this.formLogin.member_login_password) {
      await this.userProvider.login(this.formLogin).subscribe(async (data: any) => {
        // console.log(data);
        if (data.login_status) {
          await localStorage.setItem('access_token', data.access_token)
          await localStorage.setItem('member', JSON.stringify(data.member_info))
          this.navCtrl.setRoot(UserPage);
        }
      })
    }


  }
  forgetpassword() {

  }

  async register() {
    const modal = await this.modalController.create(RegisterPage);
    return await modal.present();
  }
}
