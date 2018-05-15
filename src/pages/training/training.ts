import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SessionService} from '../../app/sessionservice';
import {TrainingDetailPage} from '../training-detail/training-detail';
@Component({
  selector: 'page-training',
  templateUrl: 'training.html'
})
export class TrainingPage {
  trainings:any;
  test:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
    
    
    console.log(this.trainings);
  }
  
  jobTrainingDetail(detail)
  {

    
     this.service.setTrainingDetail(detail);
     this.navCtrl.push(TrainingDetailPage,{
      //  callback: TrainingDetailPage
      });
  }

  // myCallbackFunction = (TrainingDetailPage) => {
  //   return  TrainingDetailPage;
        
    
  //  }


   ionViewDidEnter()
   {
    // console.log("view did enter");
    this.trainings=this.service.getTrainings();
   }
  //  ionViewWillEnter()
  //  {
  //   console.log("view will enter");
  //  }

  //  ionViewCanEnter()
  //  {
  //    console.log("view can enter");
  //  }


}
