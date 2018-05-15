import { Component,ViewChild } from '@angular/core';
import { NavController,Nav } from 'ionic-angular';
import { Dashboard } from '../Dashboard/Dashboard';
import { TabsPage } from '../tabs/tabs';
import {SessionService} from '../../app/sessionservice';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class profile {
  @ViewChild(Nav) nav: Nav;
	user:any;
  loader:boolean=false;
  constructor(public navCtrl: NavController,public service:SessionService) {
  		this.user={};
  }
  submit()
  {
     //alert(JSON.stringify(this.user)); 	
       this.loader=true;
          setTimeout(() => {  
              // this.service.showToast("Thanku You Have Successfully update your profile");
              this.loader=false;   
              //  this.nav.setRoot(TabsPage, {componentFromNavParams:Dashboard});              
            }, 2000); 
     
  	//  this.navCtrl.push(TabsPage, 
    //   {
       
    //   });
  }
}
