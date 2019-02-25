import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Content } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ViewebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewebook',
  templateUrl: 'viewebook.html',
})
export class ViewebookPage {

  @ViewChild(Content) content: Content;
  dataEbook: any;
  isFirst = false
  queueEbook: any;
  // tabBarElement: any; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    // // console.log("this.navParams.data.",this.navParams.data);
    // this.queueEbook = JSON.parse(localStorage.getItem('queueEbook'))
    // this.dataEbook = this.queueEbook[this.queueEbook.length-1].data.data //this.navParams.data.data.data
    // this.isFirst = this.queueEbook[this.queueEbook.length-1].first //this.navParams.data.first
    // // console.log(this.navParams);

    // console.log('viewebook',this.queueEbook[this.queueEbook.length-1]);
    

    // this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    
    // if(this.tabBarElement) this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  }

  async ionViewDidLoad() {
    
    this.queueEbook = await JSON.parse(await localStorage.getItem('queueEbook'))
    // console.log("this.queueEbook",this.queueEbook);
    this.dataEbook = await this.queueEbook[this.queueEbook.length-1].data.data //this.navParams.data.data.data
    // console.log("this.dataEbook",this.dataEbook);
    this.isFirst = await this.queueEbook[this.queueEbook.length-1].first //this.navParams.data.first
    // console.log('viewebook',this.queueEbook[this.queueEbook.length-1]);
    
    this.content.scrollToTop();

    let _this = this;
    setInterval(async function () {  
      this.queueEbook = await JSON.parse(await localStorage.getItem('queueEbook'))
      // console.log("this.dataEbook.md_cms_id=",_this.dataEbook.md_cms_id);
      // console.log("this.queueEbook[this.queueEbook.length-1].data.data.md_cms_id=",this.queueEbook[this.queueEbook.length-1].data.data.md_cms_id);
      if(_this.dataEbook.md_cms_id != this.queueEbook[this.queueEbook.length-1].data.data.md_cms_id){
        _this.ionViewDidLoad()
      }
    },500)
    

    console.log('ionViewDidLoad ViewebookPage');
    this.viewCtrl.showBackButton(false);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    // if(this.tabBarElement) this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  }

  async ionViewDidEnter() {
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.ANY);
    // if(this.tabBarElement) this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    this.checkToken()
  }

  loader: any
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }
  
  async close(ebooks = 'false') {
    // console.log(ebooks);
    // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    // else{
    //   this.navCtrl.setRoot(TabsPage) // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    //   return true; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    // }
    if (ebooks == 'true') {
      // this.navCtrl.push(HomePage)
      this.navCtrl.parent.select(0)
    } else {
      // this.tabBarElement.style.display = 'none';
      // this.navCtrl.popToRoot()
      // this.navCtrl.setRoot(TabsPage) // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
      // this.viewCtrl.dismiss()
      
      this.presentLoading()
      this.content.scrollToTop();
      this.queueEbook = await JSON.parse(await localStorage.getItem('queueEbook'))
      await this.queueEbook.pop();
      await localStorage.setItem('queueEbook',await JSON.stringify(this.queueEbook))
      if(this.queueEbook.length == 1){
        this.dataEbook = this.queueEbook[0].data.data
        this.isFirst = this.queueEbook[this.queueEbook.length-1].first
      }else{
        this.dataEbook = this.queueEbook[this.queueEbook.length-1].data.data
      }
      this.loader.dismiss()
    }
  }

  ionViewWillLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    console.log('ionViewWillLeave');
  }

  async checkToken() {
    if (!localStorage.access_token) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      // this.tabBarElement.style.display = 'flex';
      if(this.isFirst) this.navCtrl.parent.select(4);
      else this.navCtrl.setRoot(TabsPage)
    }
  }
}
