import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController ,NavParams } from 'ionic-angular';

/**
 * Generated class for the MyModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-modal',
  templateUrl: 'my-modal.html',
})
export class MyModalPage {
   location:any;
   Name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController ) {
    this.Name="Hello";
    this.location=navParams.get('placeName');
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyModalPage');
  }
  
  modalhide() {
    this.viewCtrl.dismiss();
  }
}
