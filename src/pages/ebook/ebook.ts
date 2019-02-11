import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EbookProvider } from '../../providers/ebook/ebook';


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
  ) {

  }

  async ionViewDidLoad() {

    console.log('ionViewDidLoad EbookPage');
    this.dataHome = JSON.parse(localStorage.home)

    await this.loadCategory()
  }

  async ionViewDidEnter() {
    if (!localStorage.access_token) {
      // console.log(this.navCtrl.parent.getByIndex(4))
      this.navCtrl.parent.select(4);
    }
  }

  active: any
  data: any
  async loadCategory() {
    this.active = 'category'
    this.headContent = 'หมวดหมู่'
    this.data = {
      access_token: localStorage.access_token
    }
    await this.ebookProvider.loadCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = data.data
    })
  }
  
  async loadSubCategory(cid, cname = '') {
    this.active = 'subcategory'
    this.headContent = 'หมวดหมู่: ' + cname
    this.data = {
      cid: cid,
      cname: cname,
      access_token: localStorage.access_token
    }
    
    await this.ebookProvider.loadSubCategory(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = data.data
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
      access_token: localStorage.access_token
    }
    await this.ebookProvider.loadListContent(this.data).subscribe(async (data: any) => {
      // console.log(data);
      this.listContent = data.data
    })
  }


  async viewContent(cid='',gid='',cms_id=''){
    this.data = {
      cid: cid,
      gid: gid,
      cms_id: cms_id,
      access_token: localStorage.access_token
    }
    if(!cms_id || cms_id == ''){
      await this.ebookProvider.getCMS_ID(this.data).subscribe(async (data: any) => {
        console.log(data);
        
        console.log('error');
        if(data.status){
          console.log("md_cms_id",data.data.md_cms_id);
          this.viewContent('','',data.data.md_cms_id)
        }
      })
    }else{
      console.log('success');
      
      await this.ebookProvider.loadContent(this.data).subscribe(async (data: any) => {
        console.log(data);
        // this.listContent = data.data
        //VIEW CONTENT
        
      })
    }
    // console.log("cid",cid);
    // console.log("gid",gid);
    // console.log("cms_id",cms_id);
    
  }
}
