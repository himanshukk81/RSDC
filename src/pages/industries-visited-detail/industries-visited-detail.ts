import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the IndustriesVisitedDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-industries-visited-detail',
  templateUrl: 'industries-visited-detail.html',
})
export class IndustriesVisitedDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }
  industryVistied:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad IndustriesVisitedDetailPage');
    this.industryVistied=this.service.getJobDetail();
  }

}
