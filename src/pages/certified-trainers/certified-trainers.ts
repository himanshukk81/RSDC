import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { UserSinglePage } from '../user-single/user-single';

/**
 * Generated class for the CertifiedTrainersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-certified-trainers',
  templateUrl: 'certified-trainers.html',
})
export class CertifiedTrainersPage {
  certifiedTrainer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
    this.certifiedTrainer=this.service.getCertifiedTrainers();
  }

  detail(info)
  {
   this.service.setCertifiedTrainer(info)

    this.navCtrl.push(UserSinglePage, 
      {
       
      });


  }

}
