import { Component } from '@angular/core';
import { TrainingPage } from '../training/training';
import { profile } from '../profile/profile';
import { Dashboard } from '../Dashboard/Dashboard';
import { jobs } from '../jobs/jobs';
import { Assesments } from '../Assesments/Assesments';
import { NavParams ,NavController,Events} from 'ionic-angular';
import {SessionService} from '../../app/sessionservice';
import { ContactTpPage } from '../contact-tp/contact-tp';
import { TrainedWorkforcePage } from '../trained-workforce/trained-workforce';
import { IndustriesVisitedPage } from '../industries-visited/industries-visited';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // tab1Root = Dashboard;
  // tab2Root = TrainingPage;
  // tab3Root = profile;
  // tab4Root = jobs;
  // tab5Root=Assesments;
  // mySelectedIndex: number;
  tabs:any;
  active:any;
  userId:any;
  constructor(navParams:NavParams,public navCtrl:NavController,public events:Events,public service:SessionService) {
    // this.active=this.navCtrl.getActive().name;
    // events.subscribe('user:changed', username => {
     
    //   this.userId=this.service.getUser().id;
     
    // })

    if(this.service.getUser())
    {

      //  alert("user type::"+JSON.stringify(this.service.getUser()))
      if(this.service.getUser().userTypeId==5)
      {
         this.tabs = [
          { title: 'Home', root: Dashboard ,icon:'home'},
          { title: 'Profile', root: profile ,icon:'ios-create'},
          { title: 'Contact TP', root: ContactTpPage ,icon:'ios-person'},
          { title: 'WorkForce', root: TrainedWorkforcePage ,icon:'ios-briefcase'}
          ];  
      }
      else if(this.service.getUser().userTypeId==6)
        {
          this.tabs = [
            { title: 'Home', root: Dashboard ,icon:'home'},
            { title: 'Industries Visited', root: IndustriesVisitedPage ,icon:'ios-briefcase'}
            ];
        } 
        
        else
          {
            this.tabs = [
              { title: 'Home', root: Dashboard ,icon:'home'},
              { title: 'Training', root: TrainingPage ,icon:'ios-create'},
              { title: 'Profile', root: profile ,icon:'ios-person'},
              { title: 'Jobs', root: jobs ,icon:'ios-briefcase'}
              ];
          }   
    }

      // else if(this.service.getUserType())
      // {
      //     if(this.service.getUser().id==5)
      //   {
      //     this.tabs = [
      //       { title: 'Home', root: Dashboard ,icon:'home'},
      //       { title: 'Profile', root: profile ,icon:'ios-create'},
      //       { title: 'Contact TP', root: ContactTpPage ,icon:'ios-person'},
      //       { title: 'WorkForce', root: TrainedWorkforcePage ,icon:'ios-briefcase'}
      //       ];  
      //   }
      //     else if(this.service.getUser().id==6)
      //   {
      //     this.tabs = [
      //       { title: 'Home', root: Dashboard ,icon:'home'},
      //       { title: 'Industries Visited', root: IndustriesVisitedPage ,icon:'ios-briefcase'}
      //       ];
      //   } 
      // }
    else
    {

           this.tabs = [
            { title: 'Home', root: Dashboard ,icon:'home'},
            { title: 'Training', root: TrainingPage ,icon:'ios-create'},
            { title: 'Profile', root: profile ,icon:'ios-person'},
            { title: 'Jobs', root: jobs ,icon:'ios-briefcase'}
            ];

    }  
   
   
    //  this.mySelectedIndex = navParams.data.tabIndex || 0;

     let getComponentFromNavPArams = navParams.get('componentFromNavParams');

      if (getComponentFromNavPArams != undefined) 
      {
        this.tabs[0].root = getComponentFromNavPArams; //override first tab which set actual page
        // if(this.tabs[0].root.name=='login')
        //   {
        //     this.active='login';
        //   }

      } 
      else
        {
          this.tabs[0].root = Dashboard; // if no set, then home page
        }
  }
}
