import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams,ModalController,MenuController,App } from 'ionic-angular';
import { userType } from '../userType/userType';
import { login } from '../login/login';
import { signup } from '../signup/signup';
import {Http, Response,Headers} from '@angular/http';
import {SessionService} from '../../app/sessionservice';
import 'rxjs/add/operator/map'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


@Component({
  selector: 'page-first',
  templateUrl: 'first.html'
})
// @Component({})

export class firstPage {
  
  loader:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private service:SessionService,public menu: MenuController,public appCtrl:App,public fb:Facebook) {
  
     
  }


  fbLogin()
  {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => 

      {
        console.log('Logged into Facebook!', res)
        alert("Data222=="+JSON.stringify(res));

        this.fb.api('me?fields=id,name,email,first_name,location,picture.width(720).height(720).as(picture_large)', []).then(profile => {
          var data = {email: profile['email'], first_name: profile['first_name'],Address:profile['location'],picture: profile['picture_large']['data']['url'], username: profile['name']}
          alert("data=="+JSON.stringify(data));
        })
        .catch(e=>{
          console.log('Error logging into Facebook3', e);
          alert("Error dfsd--"+JSON.stringify(e));
        });
      })
    .catch(e =>{
      console.log('Error logging into Facebook', e);
      alert("Error--"+JSON.stringify(e));
    }) 
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }
  

  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }
  signUp()
  {
    //  this.navCtrl.push(userType, 
    //   {
       
    //   });

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
  }

  signIn()
  {
         
          this.navCtrl.push(login, 
          {          
            
          });
          
          //  this.appCtrl.getRootNav().push(login); 
          //  let postUrl = 'https://jsonplaceholder.typicode.com/posts1';
          // //  let headers = new Headers({ 'Content-Type': 'application/json' });
          //  this.http.get(postUrl)
          //   .map(val => val.json())
          //   .subscribe(data => console.log(JSON.stringify(data)),
          //              err =>console.log("err:"+err));
          //   // var smsUrl="http://api.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile=919971672881&message="+this.deviceToken+"  %200808&otp=0808"
          //   // // var verifyUrl="https://control.msg91.com/api/verifyRequestOTP.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile=919971672881&otp=0732";
          //   // // headers.append('Access-Control-Allow-Origin', '*');
          //   //   this.http.get(smsUrl)
          //   //   .map(val => val.json())
          //   //   .subscribe(data => console.log(JSON.stringify(data)))
          // }
  }
}