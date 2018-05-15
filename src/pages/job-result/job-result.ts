import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { JobDetailPage } from '../job-detail/job-detail';
/**
 * Generated class for the JobResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-job-result',
  templateUrl: 'job-result.html',
})
export class JobResultPage {
  jobs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
    

    console.log(JSON.stringify(this.jobs));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobResultPage');
  }

     ionViewDidEnter()
   {
    // console.log("view did enter");
    this.jobs=this.service.getLatestJobs();
   }

  jobDetail(job)
  {
    this.service.setJobDetail(job)
    this.navCtrl.push(JobDetailPage, 
      {
       
      });
  }

}
