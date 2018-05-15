import { Component,EventEmitter } from '@angular/core';
import { NavController, NavParams,Events,LoadingController } from 'ionic-angular';
import { signup } from '../signup/signup';
import { SessionService } from '../../app/sessionservice';
import { MyApp } from '../../app/app.component';
// import { LoadingPage } from '../loading/loading';

@Component({
  selector: 'page-userType',
  templateUrl: 'userType.html'
})
export class userType {
  isSelect:boolean;
  clickButton:any;
  selectedUser:boolean;
  userTypes:any;
  loader:any;
  // userChanged = new EventEmitter()
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: SessionService,public events: Events,public loading:LoadingController) {

    // var index=this.navCtrl.getActive().index;
    //this.isSelect= false;
    // this.userTypes:any;
    // this.userTypes=[{id:1,name:"Student(University/College)",selected:false},
    // {id:2,name:"Student(Supervisors/Professionals)",selected:false},
    // {id:3,name:"Student(RPL)",selected:false},{id:4,name:"Trainer",selected:false},{id:5,name:"Industry",selected:false},
    // {id:6,name:"Regional Co-ordinator",selected:false}
    // ];

    this.events.subscribe('usertypes:fetch', userTypes => {
        // alert("get user types::::;"+)

        if(userTypes)
          {
            this.userTypes=userTypes;
            this.loader.dismiss();
          }
        // this.loader.dismiss();  
        
        // this.loader=false;
        // alert("user types:::"+this.userTypes);
      })
    }
  

  ionViewDidLoad()
  {
    // this.loader=true;
    this.loader = this.loading.create({
         content: 'getting User Types...',
      });
    this.loader.present().then(() => {
  
    });    
    this.service.getUserTypes();
  }

      
  next()
  {

    //  this.userChanged.emit();
    //  this.events.publish('user:changed');
  	 this.navCtrl.push(signup, 
      {
        // component:"signup"
      });
  }

  selectUser(userType,index)
  {
    for(var i=0;i<this.userTypes.length;i++)
      {
         this.userTypes[i].selected=false; 
      }

     this.userTypes[index].selected=true;

     this.service.setUser(userType);
  }
  
}  
