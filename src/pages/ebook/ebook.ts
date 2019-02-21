import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { EbookProvider } from '../../providers/ebook/ebook';
import { ViewebookPage } from '../viewebook/viewebook';
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
  // dataHome: any;
  // headContent: any
  // listContent: any
  // tabBarElement: any // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  data: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ebookProvider: EbookProvider,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public screenOrientation: ScreenOrientation,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)

    // this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
  }

  queueEbook: any;
  async ionViewDidLoad() {
    // this.checkToken()
    console.log('ionViewDidLoad EbookPage');
    localStorage.setItem('queueEbook','')
    // this.tabBarElement.style.display = 'none';
    // this.dataHome = JSON.parse(localStorage.home)
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
    // this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    await this.checkToken()
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
    // await this.checkToken()
  }

  // active: any

  // async loadCategory() {
  //   this.presentLoading()
  //   this.active = 'category'
  //   this.headContent = 'หมวดหมู่'
  //   this.data = {
  //     access_token: await localStorage.getItem('access_token')
  //   }
  //   await this.ebookProvider.loadCategory(this.data).subscribe(async (data: any) => {
  //     // console.log(data);
  //     this.listContent = await data.data
  //     this.loader.dismiss()
  //   })
  // }

  // async loadSubCategory(cid, cname = '') {
  //   this.presentLoading()
  //   this.active = 'subcategory'
  //   this.headContent = 'หมวดหมู่: ' + cname
  //   this.data = {
  //     cid: cid,
  //     cname: cname,
  //     access_token: await localStorage.access_token
  //   }
  //   await this.ebookProvider.loadSubCategory(this.data).subscribe(async (data: any) => {
  //     // console.log(data);
  //     this.listContent = await data.data
  //     this.loader.dismiss()
  //   })
  // }


  // _listContent: Array<Object>
  // nextpage = 0
  // async loadListContent(cid = '', gid = '', cname = '', gname = '', page = 1, append = false) {
  //   this.presentLoading()
  //   this.nextpage = 0
  //   this.active = 'listcontent'
  //   this.headContent = 'หมวดหมู่: ' + cname + ' / หมวดหมู่ย่อย: ' + gname
  //   this.data = {
  //     cid: cid,
  //     gid: gid,
  //     cname: cname,
  //     gname: gname,
  //     page: page,
  //     access_token: await localStorage.access_token
  //   }
  //   await this.ebookProvider.loadListContent(this.data).subscribe(async (data: any) => {
  //     // console.log(data);
  //     if (append) {
  //       this._listContent = this.listContent
  //       this.listContent = await this._listContent.concat(data.data)
  //     } else {
  //       this.listContent = await data.data
  //     }
  //     this.nextpage = await data.nextpage
  //     this.loader.dismiss()
  //   })
  // }


  // async viewContent(cid = '', gid = '', cms_id = '', cname = '') {
  //   this.presentLoading()
  //   this.data = {
  //     cid: cid,
  //     gid: gid,
  //     cms_id: cms_id,
  //     cname: cname,
  //     access_token: await localStorage.access_token
  //   }
  //   if (!cms_id || cms_id == '') {
  //     await this.ebookProvider.getCMS_ID(this.data).subscribe(async (data: any) => {
  //       if (data.status) {
  //         this.viewContent('', '', data.data.md_cms_id)
  //       }
  //     })
  //   } else {

  //     await this.ebookProvider.loadContent(this.data).subscribe(async (data: any) => {
  //       // console.log(data);
  //       //VIEW CONTENT
  //       let options = {
  //         data: data,
  //         ebooks: true
  //       }
  //       this.navCtrl.push(ViewebookPage, options)
  //       // const modal = await this.modalController.create(ViewebookPage, options);
  //       // modal.onDidDismiss(data => {
  //       //   console.log('onDidDismiss');
  //       //   // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
  //       // });
  //       // await modal.present();
  //       this.loader.dismiss()
  //       return;
  //     })
  //   }
  // }

  async loadFirstContent() {
    this.presentLoading()
    this.data = {
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadFirstContent(this.data).subscribe(async (data: any) => {
      // console.log(data);
      //VIEW CONTENT
      
      let options = {
        data: data,
        first: true
      }
      // if(!localStorage.queueEbook || localStorage.queueEbook == ""){
      //   this.queueEbook = [];
      // }
      await localStorage.setItem('queueEbook',JSON.stringify([options]))
      this.queueEbook = await localStorage.getItem('queueEbook')
      // console.log("this.queueEbook",JSON.parse(this.queueEbook)[0]);
      
      // this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
      this.navCtrl.setRoot(ViewebookPage, JSON.parse(this.queueEbook)[0])
      this.loader.dismiss()

      // const modal = await this.modalController.create(ViewebookPage, options);
      // modal.onDidDismiss(data => {
      //   console.log('onDidDismiss');
      //   // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      // });
      // await modal.present();
      // this.loader.dismiss()
      return;
    })
  }

  // async search() {
  //   const modal = await this.modalController.create(SearchPage);
  //   modal.onDidDismiss(async data => {
  //     if(!data) return;

  //     this.presentLoading()
  //     await this.ebookProvider.search(data).subscribe(async (data: any) => {
  //       console.log(data);
  //       this.active = 'listsearchcontent'
  //       this.headContent = 'ผลลัพธ์จากการค้นหา'
  //       this.listContent = await data.data
  //       this.loader.dismiss()
  //     })
  //   });
  //   // return await modal.present();
  // }

  async checkToken() {
    this.presentLoading()
    
    // if(this.tabBarElement) this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
    if (!localStorage.access_token) {
      this.loader.dismiss()
      // if(this.tabBarElement) this.tabBarElement.style.display = 'flex'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
      this.navCtrl.parent.select(4);
    } else {
      // if(this.tabBarElement) this.tabBarElement.style.display = 'none'; // ปิดไว้กลัวว่าวันนึงเค้าจะกลับมาใช้อีก TT
      this.loader.dismiss()
      // await this.loadCategory()
      await this.loadFirstContent()
    }
  }

  // async doInfiniteloadListContent(infiniteScroll, data) {
  //   setTimeout(async () => {
  //     if (this.nextpage == 0) {
  //       infiniteScroll.complete();
  //       return false;
  //     }
  //     await this.loadListContent(data.cid, data.gid, data.cname, data.gname, this.nextpage, true)
  //     infiniteScroll.complete();
  //   }, 500);
  // }


  // form = {
  //   catagory: '',
  //   subcatagory: '',
  //   keytype: '',
  //   search: '',
  //   searchby: 'some',
  //   page: 1,
  //   access_token: localStorage.access_token
  // }
  // async onInput(evant) {
  //   await this.ebookProvider.search(this.form).subscribe(async (data: any) => {
  //     this.active = 'listsearchcontent'
  //     this.headContent = 'ผลลัพธ์จากการค้นหา'
  //     this.listContent = await data.data
  //   })
  // }

}
