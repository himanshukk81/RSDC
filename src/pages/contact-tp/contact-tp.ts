import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the ContactTpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-contact-tp',
  templateUrl: 'contact-tp.html',
})
export class ContactTpPage {
  obj:any={};
  loader:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ContactTpPage');


  }

  sendToTp()
  {
    this.loader=true;
    setTimeout(()=>
    {
      this.obj={training:'',trainingProvider:'',comment:''}
      this.loader=false;
      this.service.showToast("You have Successfully sent Request To TP");
    },2000)
   
  }

}
