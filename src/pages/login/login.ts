import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserPage } from '../user/user';
import { RegisterPage } from '../register/register';
import * as $ from "jquery";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public modalController: ModalController,
  ) {
    this.isButton = false;
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.checkToken()
    this.dataHome = JSON.parse(localStorage.home);
    let _this = this;
    $( "input" ).change(function() {
      _this.eventInput();
    });
  }

  checkToken() {
    if (localStorage.access_token) {
      this.navCtrl.setRoot(UserPage);
    }
  }

  async eventInput(){
    this.isButton = await ($('#member_login_email').val() != "" && $('#member_login_password').val() != "") ? true:false;
    $('#member_login_email').focus()
    // console.log(this.isButton)
  }

  async login() {
    if($('#member_login_email').val() == ""){
      $('#member_login_email').focus();
      return false;
    }else if($('#member_login_password').val() == ""){
      $('#member_login_password').focus();
      return false;
    }
    // let regExr = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    // let result = regExr.test(this.formLogin.member_login_password);
    // if (!result) {
    //   alert('โปรดกรอกรูปแบบข้อมูลให้ถูกต้อง')
    //   return false;
    // }


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
