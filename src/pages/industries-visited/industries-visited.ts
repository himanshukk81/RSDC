import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { IndustriesVisitedDetailPage } from '../industries-visited-detail/industries-visited-detail';
/**
 * Generated class for the IndustriesVisitedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-industries-visited',
  templateUrl: 'industries-visited.html',
})
export class IndustriesVisitedPage {
  industryVisted:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndustriesVisitedPage');
    this.industryVisted=this.service.getTrainings();
  }

  detail()
  {
    this.navCtrl.push(IndustriesVisitedDetailPage);
  }

}
