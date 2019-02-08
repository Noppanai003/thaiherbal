import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // base_url: any;
  // subject: any;
  // subjectEng: any;
  // subjectoffice: any;
  // subjectofficeEng: any;
  // book_cover: any;
  // description: any;
  // about: any;
  // contact: Array<any>;
  // logo: any;
  dataHome: any;

  constructor(
    public navCtrl: NavController,
    public homeProvider: HomeProvider, 

    ) {
     
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
    await this.homeProvider.loadHome().subscribe(async (data: any) => {
      await localStorage.setItem('home', JSON.stringify(data));
      this.dataHome = JSON.parse(localStorage.home)
      // console.log(this.dataHome);
      
      // this.base_url = data.base_url
      // this.subject = data.subject
      // this.subjectEng = data.subjectEng
      // this.subjectoffice = data.subjectoffice
      // this.subjectofficeEng = data.subjectofficeEng
      // this.book_cover = data.book_cover
      // this.description = data.description
      // this.about = data.about
      // this.contact = data.contact
      // this.logo = data.logo
      
      // console.log("this.contact",this.contact);
    
      // if (data.status) {
      //   await localStorage.setItem('users_username',data.users_username);
      //   this.navCtrl.setRoot(TabsPage);
      // }else{
      //   alert('รหัสของท่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
      // }
      // this.loading.dismiss();
    })
  }
  

}
