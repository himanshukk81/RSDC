import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { JobDetailPage } from '../job-detail/job-detail';
import { JobResultPage } from '../job-result/job-result';
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class jobs {
 jobsCategory:any;
 jobsRole:any;
 latestJobs:any;
 constructor(public service:SessionService,public navCtrl:NavController)
 {
  this.getJobsCategory();
  this.getJobsRole(1);
  this.getLatestJobs();
 }

  getJobsRole(categoryId)
  {
    this.jobsRole=this.service.getJobRole(categoryId);
  }
  getJobsCategory()
  {
    this.jobsCategory=this.service.getJobsCategory();
  }

  getLatestJobs()
  {
    this.latestJobs=this.service.getLatestJobs();
  }

  getjobRole()
  { 
    this.navCtrl.push(JobResultPage, 
      {
       
      });
  }

}
