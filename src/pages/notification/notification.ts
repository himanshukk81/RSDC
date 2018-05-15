import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.notifications=this.service.getTrainings();
  }

}
