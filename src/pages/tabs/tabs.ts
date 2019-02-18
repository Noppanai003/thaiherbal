import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { EbookPage } from '../ebook/ebook';
import { LoginPage } from '../login/login';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = EbookPage;
  tab4Root = ContactPage;
  tab5Root = LoginPage;

  constructor() {
  }

}
