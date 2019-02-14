import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
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
    public loadingCtrl: LoadingController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  }

  async ionViewDidLoad() {
    // this.checkToken()
    console.log('ionViewDidLoad EbookPage');
    this.dataHome = JSON.parse(localStorage.home)
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
    console.log('ionViewDidEnter');

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    await this.checkToken()
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
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
    this.headContent = 'หมวดหมู่: ' + cname
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
    this.headContent = 'หมวดหมู่: ' + cname + ' / หมวดหมู่ย่อย: ' + gname
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
        const modal = await this.modalController.create(ViewebookPage, options);
        modal.onDidDismiss(data => {
          console.log('onDidDismiss');
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        });
        await modal.present();
        this.loader.dismiss()
        return;
      })
    }
  }

  async search() {
    const modal = await this.modalController.create(SearchPage);
    modal.onDidDismiss(async data => {
      if(!data) return;
      
      this.presentLoading()
      await this.ebookProvider.search(data).subscribe(async (data: any) => {
        console.log(data);
        this.active = 'listsearchcontent'
        this.headContent = 'ผลลัพธ์จากการค้นหา'
        this.listContent = await data.data
        this.loader.dismiss()
      })
    });
    return await modal.present();
  }

  async checkToken() {

    if (!localStorage.access_token) {
      this.navCtrl.parent.select(4);
    } else {
      await this.loadCategory()
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


  form = {
    catagory: '',
    subcatagory: '',
    keytype: '',
    search: '',
    searchby: 'some',
    page: 1,
    access_token: localStorage.access_token
  }
  async onInput(evant) {
    await this.ebookProvider.search(this.form).subscribe(async (data: any) => {
      this.active = 'listsearchcontent'
      this.headContent = 'ผลลัพธ์จากการค้นหา'
      this.listContent = await data.data
    })
  }

}
