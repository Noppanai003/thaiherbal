import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EbookProvider } from '../../providers/ebook/ebook';
import { ViewebookPage } from '../viewebook/viewebook';
import { SearchPage } from '../search/search';


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
  ) {

  }

  async ionViewDidLoad() {
    this.checkToken()
    console.log('ionViewDidLoad EbookPage');
    this.dataHome = JSON.parse(localStorage.home)

    await this.loadCategory()
  }

  async ionViewDidEnter() {
    await this.checkToken()
  }

  active: any
  data: any
  async loadCategory() {
    this.active = 'category'
    this.headContent = 'หมวดหมู่'
    this.data = {
      access_token: await localStorage.access_token
    }
    await this.ebookProvider.loadCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = await data.data
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
    this.headContent = 'หมวดหมู่: ' + cname +' / หมวดหมู่ย่อย: ' + gname
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


  async viewContent(cid='',gid='',cms_id='',cname=''){
    this.data = {
      cid: cid,
      gid: gid,
      cms_id: cms_id,
      cname: cname,
      access_token: await localStorage.access_token
    }
    if(!cms_id || cms_id == ''){
      await this.ebookProvider.getCMS_ID(this.data).subscribe(async (data: any) => {
        // console.log(data);
        
        // console.log('error');
        if(data.status){
          // console.log("md_cms_id",data.data.md_cms_id);
          this.viewContent('','',data.data.md_cms_id)
        }
      })
    }else{
      
      await this.ebookProvider.loadContent(this.data).subscribe(async (data: any) => {
        // console.log(data);
        //VIEW CONTENT
        let options = {
          data: data
        }
        const modal = await this.modalController.create(ViewebookPage,options);
        return await modal.present();
      })
    }
  }

  async search(){
    const modal = await this.modalController.create(SearchPage);
    modal.onDidDismiss(data => {
      console.log("search by page Ebook",data.name);
    });
    return await modal.present();
  }

  checkToken() {
    if (!localStorage.access_token) {
      this.navCtrl.parent.select(4);
    }
  }






}
