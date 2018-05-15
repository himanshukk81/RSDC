import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { EventsDetailPage } from '../events-detail/events-detail';

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
    this.events=this.service.getLatestJobs();
  }

  
  eventDetail()
  {
     this.navCtrl.push(EventsDetailPage, 
      {
       
      });
  }

}
