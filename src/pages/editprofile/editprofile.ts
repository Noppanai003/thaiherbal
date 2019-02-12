import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import * as $ from "jquery";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  dataHome: any
  loadJOB: any
  loadEDU: any
  formeditProfile = {
    inputOrganize: '',
    inputGender: '',
    inputName: '',
    inputlname: '',
    inputEducation: '',
    inputCareer: '',
    inputAddress: '',
    inputTel: '',
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

  async ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    this.dataHome = JSON.parse(localStorage.home)
    await this.loadProfile()
    await this.loadjob()
    await this.loadedu()
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

  async loadjob() {
    await this.userProvider.loadEditprofile().subscribe(async (data: any) => {
      this.loadJOB = data.listjob
    })
  }
  async loadedu() {
    await this.userProvider.loadEditprofile().subscribe(async (data: any) => {
      this.loadEDU = data.listedu
    })
  }

  editProfile() {
    let regExrTel = /^(?:0|\(?\+66\)?\s?|0066\s?)[1-9](?:[\.\-\s]?\d){7,8}$/;
    if (this.formeditProfile.inputOrganize == '') {
      $('#inputOrganize').focus();
      return false;
    } else if (this.formeditProfile.inputGender == '') {
      $('#inputGender').focus();
      return false;
    } else if (this.formeditProfile.inputName == '') {
      $('#inputName').focus();
      return false;
    } else if (this.formeditProfile.inputlname == '') {
      $('#inputlname').focus();
      return false;
    } else if (this.formeditProfile.inputEducation == '') {
      $('#inputEducation').focus();
      return false;
    } else if (this.formeditProfile.inputCareer == '') {
      $('#inputCareer').focus();
      return false;
    } else if (this.formeditProfile.inputTel == '') {
      $('#inputTel').focus();
      return false;
    }

    if (this.formeditProfile.inputTel) {
      let result = regExrTel.test(this.formeditProfile.inputTel);
      if (!result) {
        // this.showAlertLogin('การสมัครไม่สำเร็จ',"รูปแบบเบอร์โทรของท่านไม่ถูกต้อง")
        $('#inputTel').focus();
        return false;
      }
    }
    this.presentLoading();
    this.userProvider.editprofile(this.formeditProfile).subscribe(async (data: any) => {
      if (data.status) {
        this.loader.dismiss()
        let option = {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.pop()
          }
        }
        this.showAlert('บันทึกข้อมูลเรียบร้อย', 'การแก้ไขข้อมูลของท่านเสร็จสมบูรณ์', option)
      }
      else {
        let option = {
          text: 'ตกลง',
          handler: () => {
          }
        }
        this.loader.dismiss()
        this.showAlert('แก้ไขข้อมูลไม่สำเร็จ', 'กรุณากรอกข้อมูลใหม่อีกครั้ง', option)
      }
    })
  }

  async loadProfile() {
    let parms = {
      access_token: localStorage.access_token
    }
    this.userProvider.loadProfile(parms).subscribe(async (data: any) => {
      // console.log(data);
      this.formeditProfile = {
        inputOrganize: data.md_mem_nameorg,
        inputGender: data.md_mem_gender,
        inputName: data.md_mem_name,
        inputlname: data.md_mem_lname,
        inputEducation: data.md_mem_edu,
        inputCareer: data.md_mem_career,
        inputAddress: data.md_mem_address,
        inputTel: data.md_mem_tel,
        access_token: localStorage.access_token
      }
    })

  }

  close() {
    this.navCtrl.pop();
  }


}
