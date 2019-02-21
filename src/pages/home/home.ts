import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
  // tabBarElement: any; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  constructor(
    public navCtrl: NavController,
    public homeProvider: HomeProvider,
    public screenOrientation: ScreenOrientation,
    public loadingCtrl: LoadingController,
  ) {
    this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT)
    
    // this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.presentLoading()    
    await this.homeProvider.loadHome().subscribe(async (data: any) => {
      await localStorage.setItem('home', JSON.stringify(data));
      this.dataHome = JSON.parse(localStorage.home)
      this.loader.dismiss()
      // console.log(this.dataHome);
      
    })
    
    
    // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    
  }

  loader: any
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  async ionViewDidEnter() {
    
    // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  ionViewWillEnter() {
    
    // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    console.log('ionViewWillEnter');
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

}
