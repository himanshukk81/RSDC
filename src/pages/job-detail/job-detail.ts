import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { Dashboard } from '../Dashboard/Dashboard';

/**
 * Generated class for the JobDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {

  jobDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
    
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad JobResultPage');
    var hello=this.service.getJobDetail()
    this.jobDetail=this.service.getJobDetail();
  }
  ionViewDidEnter()
  {
    // var hello=this.service.getJobDetail()
    // this.jobDetail=this.service.getJobDetail();
  }

  apply()
  {
    // this.service.showToast("You have Successfully Applied For this Job");
      // this.navCtrl.push(Dashboard) .then(() => {
      const index = this.navCtrl.getActive().index;
      for(let i = index; i >0; i--){
                  this.navCtrl.remove(i);
                }
    // }); 
    
  }

}
