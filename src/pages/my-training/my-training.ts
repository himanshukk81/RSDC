import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the MyTrainingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-training',
  templateUrl: 'my-training.html',
})
export class MyTrainingPage {
  trainings:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
    this.trainings=this.service.getTrainings();
  }

}
