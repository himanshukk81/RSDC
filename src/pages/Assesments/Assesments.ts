import { Component } from '@angular/core';
import { NavController, NavParams,Events,LoadingController } from 'ionic-angular';
//import { DatePicker } from '@ionic-native/date-picker';
import { jobs } from '../jobs/jobs';
import { TrainingPage } from '../training/training';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { Dashboard } from '../Dashboard/Dashboard';
@Component({
  selector: 'page-Assesments',
  templateUrl: 'Assesments.html'
})
export class Assesments {
  submitted:boolean;
  suggestedTrainings:boolean;
  selfAssesment:boolean;
  selfAssesmentSubmitted:boolean;
  AssesmentType:any;
  finalAssesment:boolean;
  finalAssesmentSchedule:boolean;
  submittedFinal:boolean;
  questions:any;
  count:number;
  typeCounter:number;
  disabledButton:boolean=false;
  buttonType:any="Submit";
  selectedValue:any;
  loader:boolean=false;
 constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService,public events:Events) {

    	// this.submitted=false;
    	// this.suggestedTrainings=false;
    	// this.selfAssesment=false;
    	// this.AssesmentType="Pre-Assesments";
    	// this.finalAssesment=false;
    	// this.finalAssesmentSchedule=false;
      // this.submittedFinal=false;

      //  this.loader = this.loading.create({
      //    content: 'Fet...',
      // });
      // this.loader.present().then(() => {
    
      // });
       
        // this.loader.dismiss();  
        
        // this.loader=false;
        // alert("user types:::"+this.userTypes);
        // this.service.getUserTypes();

      this.service.preAssesmentQuestions();
            // this.service.ordersApi();

        
    }
  ionViewWillEnter()
  {
    // this.service.preAssesmentQuestions();
    // this.service.ordersApi()
  }
  ionViewDidLoad()
  {
       this.loader=true;
      // this.service.preAssesmentQuestions();
       const index = this.navCtrl.getActive().index;
       this.count=0;
       this.typeCounter=0;
       this.submitted=false;
       this.AssesmentType="Pre-Assesments";


       this.events.subscribe('questions:fetch', questions => {
        // alert("get user types::::;"+)
        this.questions=[];
        if(questions)
          {
            var q=questions;
            var i;
            for(i=0;i<questions.questions.length;i++)
              {
                 questions.questions[i].options=[];
                 for(var j=0;j<questions.options.length;j++)
                  {
                     if(questions.questions[i].id==questions.options[j].Assesment_questions_id)
                      {
                        questions.questions[i].options.push(questions.options[j]);
                      }
                  }
              }
            this.questions=questions;
            // this.loader.dismiss();
          }
       //})  
          else
          {
            this.questions=questions;
            
          }
          this.loader=false;
       });   

  }

     
    previous()
    {
      this.count--;
    }
    next()
    {
      this.count++;
    }
    submit()
    {
         this.loader=true;
          setTimeout(() => {  
                      this.processSubmit();
                    }, 2000); 
        
      
     //this.count++; 
    }


    processSubmit()
    {
      this.disabledButton=true;
        this.typeCounter++;
        this.submitted=true;
        //  if(!this.selfAssesment)	
        //  {
        //  	this.submitted=true;
        //  }
        //  if(this.selfAssesment)
        //  {
        //  	this.selfAssesmentSubmitted=true;
        //  }
      
      /*if(this.typeCounter==1)
      {
       // this.AssesmentType="Self-Assesments";
        //this.disabledButton=false;
        //this.buttonType="Schedule Final Assesment";
      }*/
      // if(this.typeCounter==2)
      // {
      
      // }
      if(this.typeCounter==3)
        {
          this.AssesmentType="Final Assesments";
          // this.disabledButton=false;
          this.buttonType="Generate Certificate";

          this.count=0;

          // this.navCtrl.push(Dashboard) .then(() => {

          //     const index = this.navCtrl.getActive().index;

          //       for(let i = index; i >0; i--){
          //         this.navCtrl.remove(i);
          //       }

          //     }); 
        }


       if(this.typeCounter==4) 
        {
          const index = this.navCtrl.getActive().index;
          for(let i = index; i >0; i--){
                  this.navCtrl.remove(i);
                }

          this.service.showToast("Thank you have Successfully complete your Exam");      
        }
        this.loader=false;
    }
    
    suggestedTraining()
    {
    	// this.suggestedTrainings=true;
    }
    selfAssesments()
    {
        //  this.submitted=false;
        //  this.suggestedTrainings=false;
        //  this.selfAssesment=true;
        //this.service.showToast("Thank you For Your Feedback");
          this.typeCounter++;
          this.submitted=false;
          this.AssesmentType="Self-Assesments";
          this.count=0;
    }
    finalAssesments()
    {
      //  this.selfAssesment=false;
      //  this.finalAssesment=true;
       this.AssesmentType="Final-Assesments";

    }

    scheduleFinal()
    {
     /*  this.datePicker.show({
			  date: new Date(),
			  mode: 'date',
			  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
			}).then(
			  date => console.log('Got date: ', date),
			  err => console.log('Error occurred while getting date: ', err)
			);
	  */
	  // this.finalAssesment=false;
	  // this.finalAssesmentSchedule=true;
    }

    submitFinal()
    {
      // this.finalAssesment=false;
      // this.submittedFinal=true;
    }

    jobs()
    {
     this.navCtrl.push(jobs, 
      {
       
      });
    }

    training()
    {
     this.navCtrl.push(TrainingPage, 
      {
       
      });
    }

}
