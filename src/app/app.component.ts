import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { EbookPage } from '../pages/ebook/ebook';
import { EbookProvider } from '../providers/ebook/ebook';
import { ViewebookPage } from '../pages/viewebook/viewebook';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any = TabsPage;
  
  headContent: any
  listContent: any
  
  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,

    
    public ebookProvider: EbookProvider,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    // screenOrientation: ScreenOrientation,
  ) {
    this.initializeApp();
 
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage },
      { title: 'Ebook', component: EbookPage }
    ];

    // this.pages = [
    //   { title: 'Home', component: TabsPage, iconmenu:'home' },
    //   { title: 'Help', component: HelpPage, iconmenu:'help-circle' }
    // ];

  }

  loader: any
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.loadCategory()
  }
 
  openPage(page) {
    // this.nav.push(page.component);
  }

  active: any
  data: any
  async loadCategory() {
    this.presentLoading()
    this.active = 'category'
    this.headContent = 'หมวดหมู่'
    this.data = {
      access_token: await localStorage.getItem('access_token')
    }
    await this.ebookProvider.loadCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
      this.loader.dismiss()
    })
  }

  async loadSubCategory(cid, cname = '') {
    this.presentLoading()
    this.active = 'subcategory'
    // this.headContent = 'หมวดหมู่: ' + cname
    this.headContent = 'หมวดหมู่ย่อย'
    this.data = {
      cid: cid,
      cname: cname,
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadSubCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
      this.loader.dismiss()
    })
  }


  _listContent: Array<Object>
  nextpage = 0
  async loadListContent(cid = '', gid = '', cname = '', gname = '', page = 1, append = false) {
    this.presentLoading()
    this.nextpage = 0
    this.active = 'listcontent'
    // this.headContent = 'หมวดหมู่: ' + cname + ' / หมวดหมู่ย่อย: ' + gname
    // this.headContent = 'หมวดหมู่ย่อย: ' + gname
    this.headContent = 'หนังสือ'
    this.data = {
      cid: cid,
      gid: gid,
      cname: cname,
      gname: gname,
      page: page,
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadListContent(this.data).subscribe(async (data: any) => {
      // console.log(data);
      if (append) {
        this._listContent = this.listContent
        this.listContent = await this._listContent.concat(data.data)
      } else {
        this.listContent = await data.data
      }
      this.nextpage = await data.nextpage
      this.loader.dismiss()
    })
  }


  async viewContent(cid = '', gid = '', cms_id = '', cname = '') {
    this.presentLoading()
    this.data = {
      cid: cid,
      gid: gid,
      cms_id: cms_id,
      cname: cname,
      access_token: await localStorage.access_token
    }
    if (!cms_id || cms_id == '') {
      await this.ebookProvider.getCMS_ID(this.data).subscribe(async (data: any) => {
        if (data.status) {
          this.viewContent('', '', data.data.md_cms_id)
        }
      })
    } else {

      await this.ebookProvider.loadContent(this.data).subscribe(async (data: any) => {
        // console.log(data);
        //VIEW CONTENT
        let options = {
          data: data
        }
        this.nav.push(ViewebookPage, options)
        /*const modal = await this.modalController.create(ViewebookPage, options);
        modal.onDidDismiss(data => {
          console.log('onDidDismiss');
          // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        });
        await modal.present();*/
        this.loader.dismiss()
        return;
      })
    }
  }

  async doInfiniteloadListContent(infiniteScroll, data) {
    setTimeout(async () => {
      if (this.nextpage == 0) {
        infiniteScroll.complete();
        return false;
      }
      await this.loadListContent(data.cid, data.gid, data.cname, data.gname, this.nextpage, true)
      infiniteScroll.complete();
    }, 500);
  }

}
