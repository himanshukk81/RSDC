import { Component } from '@angular/core';
import { NavController, NavParams,Events  } from 'ionic-angular';
import { profile } from '../profile/profile';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import{SessionService} from '../../app/sessionservice';
import{Dashboard} from '../Dashboard/Dashboard';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';


// import {Headers, RequestOptions} from '@angular/http';
 
// All the RxJS stuff we need
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';


// import {HttpClientModule} from '@angular/common/http';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class signup {
  otp: boolean;
  verify:boolean;
  user:any;
  results:any;
  otpNo:any;
  diabledButton:boolean=false;
  loader:boolean=false;
  verified:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public service:SessionService,public events:Events){
  this.otp=false;
  this.verify=false;
  this.user={};
    
    
    // var index=this.navCtrl.getActive().index;    


  }

  
  sendOTP()
  {
    // var message="Credentials have been sent to your registered mobile number."
    // //this.service.showToast(message);
    // this.otp=true;

    this.diabledButton=true;
    var mobile="919971672881";
    var smsUrl="https://control.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+mobile+"&otp_expiry=2"; 
     this.http.get(smsUrl)
      .map(val => val.json())
      .subscribe(data => 
        {
          console.log(JSON.stringify(data))
        })

      err =>
				{
				 alert("Error"+err);
        }     
      
    this.otpNo=this.service.getRandomString();
    //var smsUrl="https://control.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+mobile+"&message=Your%20OTP%20is%20"+this.otpNo+"&otp="+this.otpNo;
    // https://control.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile=919971672881&message=Your%20OTP%20is%200808&otp=7550
    // this.http.get(smsUrl)
    // .map(val => val.json())
    // .subscribe(data => console.log(JSON.stringify(data)))     
    this.otp=true;
    
  }

  verifyOtp()
  {
    // var mobile="91"+this.user.mobileNo;
    if(this.user.otp.length==4)
    {
        //  this.loader=true;
        //  var userInfo={"mobile":this.user.mobileNo}
        //  this.service.setUserInfo(userInfo);
        //  setTimeout(() =>{  
        //               this.navCtrl.push(TabsPage) .then(() =>{
        //               const index = this.navCtrl.getActive().index;
        //               for(let i = index-1; i >=0; i--){
        //                 this.navCtrl.remove(i);
        //               }
        //               const startIndex = this.navCtrl.getActive().index;
        //               this.loader=false;
        //               console.log("hello");
        //               })
        //             }, 2000); 
          this.verified=true;

          // }); 
    }
        // else
        //   {
        //     this.service.showToast("Please Enter Valid OTP");
        //   }
       



         /*this.navCtrl.push(Dashboard, 
            {          

            }); */
           
    
    // }

  }

  signUp()
  {
    if(!this.user.password)
    {
       this.service.showToast("Please Enter Password");
       return;
    }

    if(this.user.confirmPassword!=this.user.password)
    {
       this.service.showToast("Password Does not match");
       return;
    }
    this.user.userTypeId=this.service.getUser().id;
    // var obj={"name":"himanshu","userTypeId":,"mobile_no":9971672881,"address":"Gurgaon","employment":true,study:true,"password":123};

    // http://www.rsdcapp.dx.am/insert/1234567890/12345/2
    var signUpUrl="http://www.rsdcapp.dx.am/insert/"+this.user.mobile_no+"/"+this.user.password+"/"+this.user.userTypeId;
    this.loader=true;
     this.http.get(signUpUrl)
			  .map((res:Response) => res)
			  .subscribe(res =>{
				// console.log(JSON.stringify(data));
          this.navCtrl.push(TabsPage) .then(() =>{
              const index = this.navCtrl.getActive().index;
              for(let i = index-1; i >=0; i--){
                this.navCtrl.remove(i);
              }
              const startIndex = this.navCtrl.getActive().index;
              this.loader=false;
            })   
          this.service.setUserInfo(this.user);	
          this.service.setUser(this.user);	
				 	this.loader=false;
			  },
			  err =>
				{
					var error = err;
					console.log(error);
					this.service.showToast("Something Went Wrong Please try Again"+error);
					this.loader=false;
        });
        
        this.navCtrl.push(Dashboard, 
        {          

        });
  }
  resendOTP()
  {
      // var mobile="91"+this.user.mobileNo;
      // https://control.msg91.com/api/retryotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile=919971672881
  }

 

}
