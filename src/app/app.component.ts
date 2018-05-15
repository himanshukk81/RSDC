import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController,Events,LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { profile } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { firstPage } from '../pages/first/first';
import { jobs } from '../pages/jobs/jobs';
import { TrainingPage } from '../pages/training/training';
import { userType } from '../pages/userType/userType';
import { Assesments } from '../pages/Assesments/Assesments';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { forgotPassword } from '../pages/forgotPassword/forgotPassword';
import { login } from '../pages/login/login';
import { signup } from '../pages/signup/signup';
import { Device } from '@ionic-native/device';
import {SessionService} from './sessionservice';
import { FCM } from '@ionic-native/fcm';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Network } from '@ionic-native/network';
import { MyTrainingPage } from '../pages/my-training/my-training';
import { JobResultPage } from '../pages/job-result/job-result';
import { AboutUsPage } from '../pages/about-us/about-us';
import { QpListPage } from '../pages/qp-list/qp-list';
import { NewsPage } from '../pages/news/news';
import { EventsPage } from '../pages/events/events';
import { NotificationPage } from '../pages/notification/notification';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { TrainedWorkforcePage } from '../pages/trained-workforce/trained-workforce';
import { CertifiedTrainersPage } from '../pages/certified-trainers/certified-trainers';
import { ContactTpPage } from '../pages/contact-tp/contact-tp';
import { EndorsementLettersPage } from '../pages/endorsement-letters/endorsement-letters';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingPage } from '../pages/loading/loading';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any=TabsPage;
  test:any;
  allPages: Array<{title: string, component: any,role:any}>;
  pages=new Array();
  deviceInfo:any={};
  user:any={};
  userId:any=1;
  loader:any;
  userData:any;
  loadPage:any=true;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public alertCtrl: AlertController,public device: Device,public service:SessionService,public fcm:FCM,
   public locationAccuracy: LocationAccuracy,public network: Network,public events:Events,public native:NativeStorage,public loading:LoadingController
  ){
    
     

      
    //this.initializeApp()

    events.subscribe('user:changed', username => {
      this.pages=[];
      this.allPages=[];
      this.userId=this.service.getUser().id;
      this.loadMenu();
    })

    if(!this.service.getUser())
      {
        this.loadMenu();
        // this.initializeApp();
      }

      
    
    // alert("initializ");
    // this.initPushNotification()
  }
  //  ionViewWillEnter()
  //  {
  //    this.loader = this.loading.create({
  //        content: 'Loading...',
  //     });
  //     this.loader.present().then(() => {
        
  //     }); 
  //  }
   loadMenu()
   { 
        this.user.name="Himanshu";
        if(this.userId<5)
          {
            this.user.type="Student(University/College)";
          }
        if(this.userId==5)
          {
            this.user.type="Industries";
          } 
          if(this.userId==6)
            {
              this.user.type="Regional Co-ordinator";
            } 
        
        this.allPages = [
          { title: 'Home', component: TabsPage ,role:"ALL"},
          { title: 'About Us', component: AboutUsPage,role:"ALL"},
          { title: 'QP List', component: QpListPage ,role:"ALL"},
          { title: 'News', component: NewsPage ,role:"ALL"},
          { title: 'Events', component: EventsPage ,role:"ALL"},
          { title: 'Jobs', component: jobs ,role:1},
          { title: 'Trainings', component: TrainingPage,role:1 },
          { title: 'My Trainings', component: MyTrainingPage,role:1 },
          { title: 'Notifications', component: NotificationPage ,role:1},
          { title: 'Contact Us', component: ContactUsPage ,role:1 },

          { title: 'Trained WorkForce', component: TrainedWorkforcePage,role:5},
          { title: 'Certified trainers', component: CertifiedTrainersPage,role:5 },
          { title: 'Contact TP', component: ContactTpPage,role:5 },
          { title: 'Endorsement Letters', component: EndorsementLettersPage,role:5 },

          // { title: 'Approve QPs', component: NotificationPage,role:5 },
          { title: 'Log Out', component:'',role:"ALL"}
        ];

        for(var i=0;i<this.allPages.length;i++)
          {
              if(this.allPages[i].role=="ALL")
              {
                // this.pages.push({"title":this.allPages[i].title,"component":this.allPages[i].component,"role":this.allPages[i].role});
                this.pages.push(this.allPages[i]);
              }

              if(this.allPages[i].role==this.userId)
              {
                this.pages.push({"title":this.allPages[i].title,"component":this.allPages[i].component,"role":this.allPages[i].role});
              }

          }  
         
          // if(this.service.getUser())
          //   {
          //     this.pages=[];
              
          //   }
            

   }  
   
  
  initializeApp() {

  
  
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.deviceInfo.deviceToken=this.device.uuid;
      // this.deviceInfo.deviceName=this.device.platform;
      // alert("platform ready");
        this.initPushNotification();
      // checkUser();
      //  this.checkNetwork();
      //  this.enableLocation();
     
      
      // this.loader = this.loading.create({
      //    content: 'Loading...',
      // });
      // this.loader.present().then(() => {
      //       this.initializeApp(); 

      // });  
      //  var userData;
      // alert("ready");
        this.native.getItem('info')
        .then
        (

            
            data =>
            {
                this.userData=data;

                if(this.userData.mobile_no)
                {

                  this.service.showToast("local storage done");
                //  alert("mobile exist");
                  // this.rootPage=TabsPage
                  this.service.setUser(this.userData);
                  this.nav.setRoot(TabsPage);
                }
                else
                {
                  // alert("mobile not exist");
                  this.service.showToast("Not local storage");
                  //this.nav.setRoot(firstPage);
                }
               
                // this.loader.dismiss();

                // this.loadPage=false
                var message="userInfo="+JSON.stringify(this.userData);
                this.service.showToast(message);
                console.log(data)

                // this.splashScreen.hide();
            },
            error =>{
                //  var message="userError"+error;
                //  this.rootPage=firstPage;
                //  this.loader.dismiss();
                // alert("user error:::"+JSON.stringify(error));
                //this.loadPage=false
                // this.nav.setRoot(firstPage);
                     

                // this.service.showToast("user error="+js message);
            } 

            
        );

        // setTimeout(() => {
        //     return userData;
        // }, 1000);


    })
     
  }



    initPushNotification()
    {

      this.fcm.subscribeToTopic('Notification');

      this.fcm.getToken().then(token=>{
        alert("token=="+token);  
        console.log("token=="+JSON.stringify(token));
      }).catch( (e) => {
          alert("error"+e);
          // //alert(JSON.stringify(e));
          });

      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
            alert("recieved notification=="+JSON.stringify(data));
        } else {
           alert("received notification without tap=="+JSON.stringify(data))
        };
      })

      this.fcm.onTokenRefresh().subscribe(token=>{
         alert("refresh token==="+JSON.stringify(token));
         console.log("refresh token="+JSON.stringify(token));
      })

      this.fcm.unsubscribeFromTopic('Notification');
    }
    checkNetwork()
    {

      // alert("checking Network");
      // watch network for a disconnect
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        // console.log('network was disconnected :-(');

        // alert("you are disconnect");
          
        // this.modal = this.modalCtrl.create(MyModalPage);
        // this.modal.present();

        var message="Your Are Offline";
        this.service.showToast(message);
        
      });

      // stop disconnect watch
      // disconnectSubscription.unsubscribe();


      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        // console.log('network connected!');


        // alert("you are connected");

        var message="Your Are Online";
        this.service.showToast(message);
        // this.modalProperty.modalhide();

        // this.modal.dismiss();
        // this.enableLocation();
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            var message="You Got Wifi Connection"
            this.service.showToast(message);
          }
        }, 3000);
      });

      // stop connect watch
      // connectSubscription.unsubscribe();   
    } 
    enableLocation()
    {
        // alert("Calling location");
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest) {
                  console.log("request"+canRequest); 
                  // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => console.log("Request successful"),
              error =>console.log("Request failed"+error));
          }

        });
    }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    //  alert("open menu"+JSON.stringify(page))
    if(page.title=='Log Out')
      {
        // alert("login page")
        // this.nav.setRoot(login);
        this.presentConfirm();
      }
      else
      {
        this.nav.setRoot(TabsPage, {componentFromNavParams: page.component});
      }
    
  }

  
  presentConfirm() {
        let alert = this.alertCtrl.create({
          title: 'LogOut',
          message: 'Are You Sure you want to Logout?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                // console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                // console.log('Buy clicked');
                this.native.clear()        
                  .then(()=>{
                    this.service.showToast("cleared Storage");
                    console.log("clear")
                  },
                  error =>{
                      this.service.showToast("Error="+JSON.stringify(error));
                      })    
                this.nav.setRoot(login);
              }
            }
          ]
        })  

        alert.present();
  }      
}
