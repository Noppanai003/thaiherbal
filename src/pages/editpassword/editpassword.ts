import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import * as $ from "jquery";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
/**
 * Generated class for the EditpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editpassword',
  templateUrl: 'editpassword.html',
})
export class EditpasswordPage {
  dataHome: any
  formeditPass = {
    inputOldpass: '',
    inputNewpass: '',
    inputNewpassConfirm: '',
    access_token: localStorage.access_token
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpasswordPage');
    this.dataHome = JSON.parse(localStorage.home)
  }

  loader: any
  presentLoadingEditPass() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  showAlert(title, msg, option) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [option]
    });
    alert.present();
  }

  async editpass() {
    let regExrPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (this.formeditPass.inputOldpass == '') {
      $('#inputOldpass').focus();
      return false
    } else if (this.formeditPass.inputNewpass == '') {
      $('#inputNewpass').focus();
      return false
    } else if (this.formeditPass.inputNewpassConfirm == '') {
      $('#inputNewpassConfirm').focus();
      return false
    }

    if (this.formeditPass.inputNewpass) {
      let result = regExrPassword.test(this.formeditPass.inputNewpass);
      if (!result) {
        // await this.showAlert('การสมัครไม่สำเร็จ',"รูปแบบรหัสผ่านของท่านไม่ถูกต้อง\nจะต้องเป็นตัวอักษรภาษาอังกฤษ หรือ ตัวเลข อย่างน้อย 8 หลักขึ้นไป และจะต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        $('#inputNewpass').focus();
        return false;
      }
    } else if (this.formeditPass.inputNewpassConfirm) {
      let result = regExrPassword.test(this.formeditPass.inputNewpassConfirm);
      if (!result) {
        // await this.showAlert('การสมัครไม่สำเร็จ',"รูปแบบรหัสผ่านของท่านไม่ถูกต้อง\nจะต้องเป็นตัวอักษรภาษาอังกฤษ หรือ ตัวเลข อย่างน้อย 8 หลักขึ้นไป และจะต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        $('#inputNewpassConfirm').focus();
        return false;
      }
    }

    if (this.formeditPass.inputNewpass != this.formeditPass.inputNewpassConfirm) {
      $('#inputNewpassConfirm').focus();
      return false;
    }
    this.presentLoadingEditPass()
    this.userProvider.editpass(this.formeditPass).subscribe(async (data: any) => {
      if (data.status) {
        let option = {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.pop()
          }
        }
        this.showAlert('บันทึกข้อมูลเรียบร้อย', 'การแก้ไขข้อมูลของท่านเสร็จสมบูรณ์', option)
        this.loader.dismiss()
      }
      else {
        let option = {
          text: 'ตกลง',
          handler: () => {
          }
        }
        this.showAlert('เปลี่ยนรหัสผ่านไม่สำเร็จ', 'กรุณากรอกรหัสผ่านอีกครั้ง', option)
        this.loader.dismiss()
      }
    })
  }

  close() {
    this.navCtrl.pop();
  }

}
