import { Component,NgZone,ViewChild } from '@angular/core';
import { NavController, NavParams,ModalController,MenuController,Nav  } from 'ionic-angular';
import { forgotPassword } from '../forgotPassword/forgotPassword';
import { signup } from '../signup/signup';
import { MyModalPage } from '../my-modal/my-modal';
import { TabsPage } from '../tabs/tabs';
import { Dashboard } from '../Dashboard/Dashboard';
import { userType } from '../userType/userType';
import {SessionService} from '../../app/sessionservice';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class login {
  @ViewChild(Nav) nav: Nav;

  user:any;	
  profileModal:any;
  loader:boolean=false;
 constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public ngZone:NgZone,public menu:MenuController,public service:SessionService,public http:Http) 
 	{		
		this.user={};
		this.profileModal = this.modalCtrl.create(MyModalPage);
	    

	  }

	  ionViewDidEnter() {
		   //  this.menu.swipeEnable(true, 'menu1');
		  //    this.nav.setRoot();
  	  }
	  forgotPassword()
	  {
		  this.navCtrl.push(forgotPassword, 
		  {
		   
		  });
	  }

	  signUp()
	  {
	  	 this.navCtrl.push(userType, 
		  {
		   
		  });
	  }

	  login()
	  {

		if(!this.user.mobileNo)
		{
			this.service.showToast("Please Enter Mobile No");
			return;
		}
		//   var user={"mobile":this.user.userName};
		  
		  this.loader=true;
		  var error;
		 var loginUrl="http://www.rsdcapp.dx.am/"+this.user.mobileNo+"/"+this.user.password;
			// var loginUrl="http://www.rsdcapp.dx.am/9971672881/123";

			// var smsUrl="https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699";
			// var headers="Access-Control-Allow-Origin: *";
		      this.http.get(loginUrl)
			  .map((res:Response) => res.json())
			  .subscribe(data =>{
				console.log(JSON.stringify(data));
				 if(data)
					{
						// alert("heelo");


						this.navCtrl.push(TabsPage, 
						{
							
						});
						// this.service.getUser()
						

						this.service.setUserInfo(data);	
						this.service.setUser(data);	

						// this.service.showToast("Invalid Credential");		

					}
				else
					{
						this.service.showToast("Invalid Credential");
						// alert("no data");
					}
				 	this.loader=false;
			  },
			  err =>
				{
					error = err;
					console.log(error);

					// alert("Error:::-"+error);
					this.service.showToast("Something Went Wrong Please try Again"+error);
					this.loader=false;
				});
				
				   
				
			//   setTimeout(() => {  
            //       // this.loadMap();
            //           this.navCtrl.push(TabsPage, 
			// 			{
						
			// 			});
            //             this.loader=false;           
            //         }, 2000); 
	  	 
	  }
}
