import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { login } from '../login/login';
@Component({
  selector: 'page-forgotPassword',
  templateUrl: 'forgotPassword.html'
})
export class forgotPassword {
  otp:boolean;
  verify:boolean;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.otp=false;
    this.verify=false;
    this.user={};
  }
  sendOTP()
  {
    this.otp=true;


    
  }

  verifyOtp()
  {
    if(this.user.otp.length==4)
    {
      this.verify=true;
      this.user.otpMessage="OTP Verified Successfully";

      this.navCtrl.push(login, 
      {
       
      });
    }

  }

}
