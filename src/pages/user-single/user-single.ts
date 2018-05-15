import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the UserSinglePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-user-single',
  templateUrl: 'user-single.html',
})
export class UserSinglePage {
  userSingle:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: SessionService) {
  }

  ionViewWillLoad() {
    this.userSingle=this.service.getCertifiedTrainer();
  }

}
