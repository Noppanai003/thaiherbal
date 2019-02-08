import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EbookPage } from './ebook';

@NgModule({
  declarations: [
    EbookPage,
  ],
  imports: [
    IonicPageModule.forChild(EbookPage),
  ],
})
export class EbookPageModule {}
