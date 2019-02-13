import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the ForgotpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  dataHome: any;
  formforgot = {
    email_forgot: ''
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  async ionViewDidEnter() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }
  
  async forgotpass() {
    // if (!this.formforgot.email_forgot) {
    //   return alert('กรุณาใส่ข้อมูลให้ครบถ้วน!!');
    // }
    await this.userProvider.forgot(this.formforgot).subscribe(async (data: any) => {
      // if (data.status) {
      //   alert('สมัครสมาชิก สำเร็จ!!')
      //   this.close()
      // }else{
      //   alert('ทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
      // }
      // this.close()
    })
  }

  close() {
    this.navCtrl.pop();
  }

}
