import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EbookProvider } from '../../providers/ebook/ebook';
import { ViewebookPage } from '../viewebook/viewebook';
import { SearchPage } from '../search/search';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the EbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ebook',
  templateUrl: 'ebook.html',
})
export class EbookPage {
  dataHome: any;
  headContent: any
  listContent: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ebookProvider: EbookProvider,
    public modalController: ModalController,
    public screenOrientation: ScreenOrientation,
  ) {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  async ionViewDidLoad() {
    // this.checkToken()
    console.log('ionViewDidLoad EbookPage');
    this.dataHome = JSON.parse(localStorage.home)

    
  }

  async ionViewDidEnter() {
    console.log('ionViewDidEnter');
    
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    await this.checkToken()
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  active: any
  data: any
  async loadCategory() {
    this.active = 'category'
    this.headContent = 'หมวดหมู่'
    this.data = {
      access_token: await localStorage.getItem('access_token')
    }
    await this.ebookProvider.loadCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
      // alert("access_token="+this.data.access_token)
    })
  }

  async loadSubCategory(cid, cname = '') {
    this.active = 'subcategory'
    this.headContent = 'หมวดหมู่: ' + cname
    this.data = {
      cid: cid,
      cname: cname,
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadSubCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
    })
  }

  async loadListContent(cid = '', gid = '', cname = '', gname = '') {
    this.active = 'listcontent'
    this.headContent = 'หมวดหมู่: ' + cname + ' / หมวดหมู่ย่อย: ' + gname
    this.data = {
      cid: cid,
      gid: gid,
      cname: cname,
      gname: gname,
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadListContent(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
    })
  }


  async viewContent(cid = '', gid = '', cms_id = '', cname = '') {
    this.data = {
      cid: cid,
      gid: gid,
      cms_id: cms_id,
      cname: cname,
      access_token: await localStorage.access_token
    }
    if (!cms_id || cms_id == '') {
      await this.ebookProvider.getCMS_ID(this.data).subscribe(async (data: any) => {
        // console.log(data);

        // console.log('error');
        if (data.status) {
          // console.log("md_cms_id",data.data.md_cms_id);
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
        const modal = await this.modalController.create(ViewebookPage, options);
        modal.onDidDismiss(data => {
          console.log('onDidDismiss');
          // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        });
        return await modal.present();
      })
    }
  }

  async search() {
    const modal = await this.modalController.create(SearchPage);
    modal.onDidDismiss(data => {
      console.log("search by page Ebook", data.name);
    });
    return await modal.present();
  }

  async checkToken() {
    
    if(!localStorage.access_token){
      this.navCtrl.parent.select(4);
    }else{
      await this.loadCategory()
    }
  }


  async doInfiniteloadListContent(infiniteScroll,data) {
    console.log('Begin async operation');

    setTimeout(async () => {
      await this.loadListContent(data.cid,data.gid,data.cname,data.gname)
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  async doInfiniteloadCategory(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(async () => {
      let _listContent = this.listContent
      await this.loadCategory()
      this.listContent = await _listContent.concat(this.listContent)

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  
  



}
