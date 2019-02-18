import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserPage } from '../user/user';
import { RegisterPage } from '../register/register';
import { ForgotpassPage } from '../forgotpass/forgotpass';
import * as $ from "jquery";
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
  // @ViewChild('member_login_password') member_login_password;
  formLogin = {
    member_login_email: '',
    member_login_password: '',
  }
  isButton: boolean;
  tabBarElement: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

    this.isButton = true;
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.checkToken()
    this.dataHome = JSON.parse(localStorage.home);
    
    this.tabBarElement.style.display = 'flex';
    // let _this = this;
    // $( "input" ).change(function() {
    //   _this.eventInput();
    // });
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  loader: any
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  showAlert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['ตกลง']
    });
    alert.present();
  }

  checkToken() {
    if (localStorage.access_token) {
      this.navCtrl.setRoot(UserPage);
    }
  }

  // async eventInput(){
  // this.isButton = await ($('#member_login_email').val() != "" && $('#member_login_password').val() != "") ? true:false;

  //   $('#member_login_email').focus()
  //   // console.log(this.isButton)
  // }

  async login() {
    if ($('#member_login_email').val() == "") {
      $('#member_login_email').focus();
      return false;
    } else if ($('#member_login_password').val() == "") {
      $('#member_login_password').focus();
      return false;
    }

    if (this.formLogin.member_login_email && this.formLogin.member_login_password) {
      this.presentLoading()
      await this.userProvider.login(this.formLogin).subscribe(async (data: any) => {
        // console.log(data);
        if (data.login_status) {
          await localStorage.setItem('access_token', await data.access_token)
          await localStorage.setItem('member', await JSON.stringify(data.member_info))
          if (localStorage.access_token) {
            this.loader.dismiss()
            this.navCtrl.setRoot(UserPage)
            // this.navCtrl.parent.select(2)
          }
        } else {
          this.showAlert('เข้าสู่ระบบไม่สำเร็จ', 'ที่อยู่อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาลองอีกครั้ง')
          this.loader.dismiss()
        }
      })
    }


  }

  async forgetpassword() {
    // this.navCtrl.push(ForgotpassPage);
    const modal = await this.modalController.create(ForgotpassPage);
    return await modal.present();
  }

  async register() {
    const modal = await this.modalController.create(RegisterPage);
    return await modal.present();
  }
}
