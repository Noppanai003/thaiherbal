import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { PolicyPage } from '../policy/policy';
import { UserProvider } from '../../providers/user/user';
import * as $ from "jquery";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  dataHome: any
  loadJOB: any
  loadEDU: any
  formregister = {
    inputOrganize: '',
    inputGender: '',
    inputName: '',
    inputlname: '',
    inputEducation: '',
    inputCareer: '',
    inputAddress: '',
    inputTel: '',
    inputEmail: '',
    inputPassword: '',
    inputRepassword: '',
    checkterm: false

  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public userProvider: UserProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.dataHome = JSON.parse(localStorage.home)
    this.loadjob()
    this.loadedu()
  }

  loader: any
  presentLoading() {
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

  async register() {
    let regExrTel = /^(?:0|\(?\+66\)?\s?|0066\s?)[1-9](?:[\.\-\s]?\d){7,8}$/;
    let regExrMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regExrPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (this.formregister.inputOrganize == '') {
      $('#inputOrganize').focus();
      return false;
    } else if (this.formregister.inputGender == '') {
      $('#inputGender').focus();
      return false;
    } else if (this.formregister.inputName == '') {
      $('#inputName').focus();
      return false;
    } else if (this.formregister.inputlname == '') {
      $('#inputlname').focus();
      return false;
    } else if (this.formregister.inputEducation == '') {
      $('#inputEducation').focus();
      return false;
    } else if (this.formregister.inputCareer == '') {
      $('#inputCareer').focus();
      return false;
    } else if (this.formregister.inputTel == '') {
      $('#inputTel').focus();
      return false;
    } else if (this.formregister.inputEmail == '') {
      $('#inputEmail').focus();
      return false;
    } else if (this.formregister.inputPassword == '') {
      $('#inputPassword').focus();
      return false;
    } else if (this.formregister.inputRepassword == '') {
      $('#inputRepassword').focus();
      return false;
    } else if (!this.formregister.checkterm) {
      $('#checkterm').focus();
      return false;
    }


    if (this.formregister.inputPassword) {
      let result = regExrPassword.test(this.formregister.inputPassword);
      if (!result) {
        // await this.showAlertLogin('การสมัครไม่สำเร็จ',"รูปแบบรหัสผ่านของท่านไม่ถูกต้อง\nจะต้องเป็นตัวอักษรภาษาอังกฤษ หรือ ตัวเลข อย่างน้อย 8 หลักขึ้นไป และจะต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        $('#inputPassword').focus();
        return false;
      }
    } else if (this.formregister.inputRepassword) {
      let result = regExrPassword.test(this.formregister.inputPassword);
      if (!result) {
        // await this.showAlertLogin('การสมัครไม่สำเร็จ',"รูปแบบรหัสผ่านของท่านไม่ถูกต้อง\nจะต้องเป็นตัวอักษรภาษาอังกฤษ หรือ ตัวเลข อย่างน้อย 8 หลักขึ้นไป และจะต้องมีตัวอักษรภาษาอังกฤษตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
        $('#inputRepassword').focus();
        return false;
      }
    }

    if (this.formregister.inputPassword != this.formregister.inputRepassword) {
      // await this.showAlertLogin('การสมัครไม่สำเร็จ',"การยืนยันรหัสผ่านของท่านไม่ถูกต้อง")
      $('#inputRepassword').focus();
      return false;
    }

    if (this.formregister.inputEmail) {
      let result = regExrMail.test(this.formregister.inputEmail);
      if (!result) {
        // this.showAlertLogin('การสมัครไม่สำเร็จ',"รูปแบบเบอร์โทรของท่านไม่ถูกต้อง")
        $('#inputEmail').focus();
        return false;
      }
    }

    if (this.formregister.inputTel) {
      let result = regExrTel.test(this.formregister.inputTel);
      if (!result) {
        // this.showAlertLogin('การสมัครไม่สำเร็จ',"รูปแบบเบอร์โทรของท่านไม่ถูกต้อง")
        $('#inputTel').focus();
        return false;
      }
    }
    this.presentLoading();
    this.userProvider.register(this.formregister).subscribe(async (data: any) => {
      if (data.status) {
        this.loader.dismiss()
        let option = {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.pop()
          }
        }
        this.showAlert('สมัครสมาชิกเรียบร้อยแล้ว', 'แต่ท่านต้องทำการยืนยัน E-mail ก่อน ระบบจะส่ง link เพื่อยืนยันไปยัง E-mail ที่ท่านระบุไว้ กรุณากด link เพื่อยืนยันอีกครั้ง เพื่อการสมัครสมาชิกที่สมบูรณ์', option)
        this.navCtrl.pop()
      } else {
        this.loader.dismiss()
        let option = {
          text: 'ตกลง',
          handler: () => {
          }
        }
        this.showAlert('การสมัครไม่สำเร็จ', data.message, option)
      }
    })
  }

  async loadjob() {
    await this.userProvider.loadRegister().subscribe(async (data: any) => {
      this.loadJOB = data.listjob
    })
  }
  async loadedu() {
    await this.userProvider.loadRegister().subscribe(async (data: any) => {
      this.loadEDU = data.listedu
    })
  }

  policy(lang = 'th') {
    let option = {
      lang: lang
    }
    // this.navCtrl.push(PolicyPage,option);
    const modal = this.modalController.create(
      PolicyPage,
      option
    );
    return modal.present();

  }

  close() {
    this.navCtrl.pop();
  }
}
