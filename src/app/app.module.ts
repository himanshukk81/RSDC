import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { profile } from '../pages/profile/profile';
import { jobs } from '../pages/jobs/jobs';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { userType } from '../pages/userType/userType';
import { Assesments } from '../pages/Assesments/Assesments';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { forgotPassword } from '../pages/forgotPassword/forgotPassword';
import { login } from '../pages/login/login';
import { firstPage } from '../pages/first/first';
import { signup } from '../pages/signup/signup';
// import {RouterModule} from '@angular/router'
import { HttpModule }    from '@angular/http';
import{SessionService} from './sessionservice';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import * as FileSaver from 'file-saver';
import { FileSaverModule } from 'ngx-filesaver';
import { FCM } from '@ionic-native/fcm';
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { MyModalPage } from '../pages/my-modal/my-modal';
import { Toast } from '@ionic-native/toast';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';

import { JobResultPage } from '../pages/job-result/job-result';
import { JobDetailPage } from '../pages/job-detail/job-detail';
import { CertifiedTrainersPage } from '../pages/certified-trainers/certified-trainers';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { ContactTpPage } from '../pages/contact-tp/contact-tp';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { EndorsementLettersPage } from '../pages/endorsement-letters/endorsement-letters';
import { EventsPage } from '../pages/events/events';
import { EventsDetailPage } from '../pages/events-detail/events-detail';
import { IndustriesVisitedPage } from '../pages/industries-visited/industries-visited';
import { IndustriesVisitedDetailPage } from '../pages/industries-visited-detail/industries-visited-detail';
import { MyTrainingPage } from '../pages/my-training/my-training';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NotificationPage } from '../pages/notification/notification';
import { QpListPage } from '../pages/qp-list/qp-list';
import { TrainedWorkforcePage } from '../pages/trained-workforce/trained-workforce';
import { TrainingPage } from '../pages/training/training';
import { TrainingDetailPage } from '../pages/training-detail/training-detail';
import { UserFeedBackPage } from '../pages/user-feedback/user-feedback';
import { AboutUsPage } from '../pages/about-us/about-us';
import { UserSinglePage } from '../pages/user-single/user-single';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingPage } from '../pages/loading/loading';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// import { AuthModule } from 'angular2-auth';
// import { OAuth } from 'oauth-1.0a';

/*@Component({
  selector: 'ion-app',
  template: `
    <router-outlet>/<router-outlet>
  `,
})*/
// const routes =[
//       {
//         path: 'signIn',
//         component: login
//       }
      
      
//     ]


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    profile,
    TabsPage,
    jobs,
    firstPage,
    userType,
    Assesments,
    forgotPassword,
    login,
    signup,
    Dashboard,
    MyModalPage,
  
    JobResultPage,
    UserFeedBackPage,
    TrainingDetailPage,
    TrainingPage,
    TrainedWorkforcePage,
    QpListPage,
    NotificationPage,
    NewsDetailPage,
    NewsPage,
    MyTrainingPage,
    IndustriesVisitedDetailPage,
    IndustriesVisitedPage,
    EventsDetailPage,
    EventsPage,
    EndorsementLettersPage,
    ContactUsPage,
    ContactTpPage,
    ChangePasswordPage,
    JobDetailPage,
    AboutUsPage,
    CertifiedTrainersPage,
    UserSinglePage,
    LoadingPage
    // FCM,
    // Push
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes) ,
    IonicModule.forRoot(MyApp,{
       tabsHideOnSubPages: true,
    }),
    // AuthModule.forRoot({}),
    IonicStorageModule.forRoot(),
    HttpModule,
    FileSaverModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    profile,
    TabsPage,
    jobs,
    firstPage,
    userType,
    Assesments,
    forgotPassword,
    login,
    signup,
    Dashboard,
    MyModalPage,
    JobResultPage,
    UserFeedBackPage,
    TrainingDetailPage,
    TrainingPage,
    TrainedWorkforcePage,
    QpListPage,
    NotificationPage,
    NewsDetailPage,
    NewsPage,
    MyTrainingPage,
    IndustriesVisitedDetailPage,
    IndustriesVisitedPage,
    EventsDetailPage,
    EventsPage,
    EndorsementLettersPage,
    ContactUsPage,
    ContactTpPage,
    ChangePasswordPage,
    JobDetailPage,
    AboutUsPage,
    CertifiedTrainersPage,
    UserSinglePage,
    LoadingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    Toast, 
    Device,
    FCM,
    LocationAccuracy,
    Network,
    Diagnostic,
    Geolocation,
    Facebook, 
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
