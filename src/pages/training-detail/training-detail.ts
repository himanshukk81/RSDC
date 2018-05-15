import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionService} from '../../app/sessionservice';
import {TrainingPage} from '../training/training';
/**
 * Generated class for the TrainingDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-training-detail',
  templateUrl: 'training-detail.html',
})
export class TrainingDetailPage {
  trainingInfo:any;
  callback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
    

  }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad TrainingDetailPage');
//   }
  ionViewWillEnter(){
      this.callback = this.navParams.get("callback")
      // this.trainingInfo=this.service.getTrainingDetail();

      console.log(this.callback);
 }
  joinTraining()
  {
    // this.service.showToast("You Have Successfully Join the Training");
    const index = this.navCtrl.getActive().index;
      for(let i = index; i >0; i--){
                  this.navCtrl.remove(i);
                }
  }
 ionViewWillLeave() {
      
      
      //  this.navCtrl.setRoot(TrainingPage);
      // var value:boolean=true;
      
          // this.navCtrl.push(TrainingPage); 
          // this.navCtrl.pop();
        
       
      //  
        // this.navCtrl.remove(2,1);
    //  this.callback(TrainingDetailPage).then(()=>{
            
    // })
    
 }

 leave()
 {
    this.navCtrl.pop(); 
 }
}
