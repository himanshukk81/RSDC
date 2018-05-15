import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the TrainedWorkforcePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-trained-workforce',
  templateUrl: 'trained-workforce.html',
})
export class TrainedWorkforcePage {
  trainedWorkForce:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
     this.trainedWorkForce= this.service.getTrainedWorkForce();
    console.log('ionViewDidLoad TrainedWorkforcePage');
  }

}
