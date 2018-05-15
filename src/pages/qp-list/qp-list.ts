import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the QpListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-qp-list',
  templateUrl: 'qp-list.html',
})
export class QpListPage {
  qpList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QpListPage');
     this.qpList=  this.service.getLatestJobs();
  }

}
