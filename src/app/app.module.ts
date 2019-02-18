import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EbookPage } from '../pages/ebook/ebook';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PolicyPage } from '../pages/policy/policy';
import { ForgotpassPage } from '../pages/forgotpass/forgotpass';
import { ViewebookPage } from '../pages/viewebook/viewebook';
import { EditpasswordPage } from '../pages/editpassword/editpassword';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { SearchPage } from '../pages/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { HomeProvider } from '../providers/home/home';
import { UserProvider } from '../providers/user/user';
import { EbookProvider } from '../providers/ebook/ebook';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    EbookPage,
    UserPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ForgotpassPage,
    ViewebookPage,
    EditpasswordPage,
    EditprofilePage,
    SearchPage,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    EbookPage,
    UserPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PolicyPage,
    ForgotpassPage,
    ViewebookPage,
    EditpasswordPage,
    EditprofilePage,
    SearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    UserProvider,
    EbookProvider,
    ScreenOrientation,
  ]
})
export class AppModule {}
