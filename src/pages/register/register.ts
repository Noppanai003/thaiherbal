import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PolicyPage } from '../policy/policy';
import { UserProvider } from '../../providers/user/user';

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
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.dataHome = JSON.parse(localStorage.home)
    this.loadjob()
    this.loadedu()
  }

  async register(){
     this.userProvider.register(this.formregister).subscribe(async(data: any) => {
      
    })
  }

  async loadjob(){
    await this.userProvider.loadRegister().subscribe(async(data: any) => {
      this.loadJOB = data.listjob
    })
  }
  async loadedu(){
    await this.userProvider.loadRegister().subscribe(async(data: any) => {
      this.loadEDU= data.listedu
    })
  }

  policy(lang='th'){
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
