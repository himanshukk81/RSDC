import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
// import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import {Events} from 'ionic-angular';

var OAuth = require('oauth-1.0a');
var CryptoJS = require('crypto');   
var  jQuery =require('jquery');
// import { OAuth } from 'oauth-1.0a';


// import { CryptoJS } from 'crypto-js';
// import {jQuery} from 'jquery';

// import {Oauth} from 'ng2-cordova-oauth/oauth'

// import { EventsPage } from '../pages/events/events';

@Injectable()

export class SessionService {
    preQuestions:any;
    selfQuestions:any;
    finalQuestions:any;
    latestJobs:any;
    jobDetail:any;
    trainingDetail:any;
    user:any;
    certifiedTrainer:any;
    token:any;
    userTypeData:any;
    constructor(public toast:Toast,public nativeStorage: NativeStorage,public http:Http,public events:Events){
    }

    

    // setUserInfo(userInfo)
    // {
    //     this.storage.set('name','age');
    // }
    // getUserInfo()
    // {

    // }

    setUserInfo(userInfo)
    {
    //    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
        this.nativeStorage.setItem('info',userInfo)
        .then(
            () =>
                {
                 var message="stored";
                 this.showToast("stored")
                },
            error =>{
                var message="stored error="+error;
                 this.showToast(message)
            } 
        ); 
    }
    

    setUserLocation(userLocation)
    {
        this.nativeStorage.setItem('userLocation',userLocation)
        .then(
            () =>
                {
                 var message="stored";
                 this.showToast("stored location")
                },
            error =>{
                var message="stored location error="+error;
                 this.showToast(message)
            } 
        );
    }

    getUserLocation()
    {
        alert("getting location");
        var userLocation;
        this.nativeStorage.getItem('userLocation')
        .then(
            data =>
                {
                 var message="stored location"+JSON.stringify(data);
                 this.showToast(message);
                 userLocation=data;   
                
                },
            error =>{
                var message="stored location error="+JSON.stringify(error);
                this.showToast(message)
            } 
        );
        setTimeout(()=>{
            return userLocation
        },1000)
        
    }



    

    getUserInfo()
    {
        var userData;
        this.nativeStorage.getItem('info')
        .then
        (
            data =>
            {
                userData=data;
                var message="userInfo="+JSON.stringify(userData);
                this.showToast(message);
                console.log(data)
            },
            error =>{
                 var message="userError"+error;
                this.showToast("user error="+message);
            } 
        );

        setTimeout(() => {
            return userData;
        }, 1000);
    }    
     

       
    getRandomString()
    {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    setDeviceToken(deviceToken)
    {
        this.token=deviceToken;
        
    }

    getDeviceToken()
    {
        return this.token;
    }
    showToast(message)
    {
        this.toast.show(message, "short", 'bottom').subscribe(
        toast => {
            console.log(toast);
        }
      );
    }


    ordersApi()
    {
        var  key='ck_7525687356c29e539b2b44f0f774ea00bd62d1cc';
        var  secret= 'cs_738d3244eaa72c90d6381fb8082baa90149247e1';
        let body=
        {
            "code":"10off",
            "discount_type":"percent",
            "amount":10,
            "individual_use":"true",
            "exclude_sale_items":true,
            "minimum_amount":100.00
        }

            function hash_function_sha1(base_string, key) {
                return CryptoJS.createHmac('sha1', key).update(base_string).digest('base64');
            }
                    var oauth = new OAuth({
                        consumer: {
                            key: key,
                            secret: secret
                        },        
                        hash_function: hash_function_sha1,
                        signature_method: 'HMAC-SHA1'
                    });  

                var request_data = {
                    url: 'http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/coupons',
                    method: 'POST'
                };

                var authkey =oauth.authorize(request_data);
                var keyoauth = new URLSearchParams();
                for(let param in authkey) {
                    keyoauth.set(param,authkey[param]);
                }
                    // let headers = new Headers({ 'Accept': 'application/json' });

                    // var headers = new Headers();
                    // headers.append('Accept', 'application/json');
                    // headers.append('Content-Type', 'application/json');
                    // headers.append('Access-Control-Allow-Origin', '*');
                    // headers.append('Access-Control-Allow-Credentials', 'true');
                    // headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
                    // headers.append("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token");
                    
                    console.log(keyoauth);
                    let options = new RequestOptions({
                    method: request_data.method,
                    url: request_data.url,
                    headers: oauth.toHeader(oauth.authorize(request_data)),
                    search:keyoauth,
                    body:body
                    });

                    console.log('http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/coupons',options);
                    this.http.post('http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/coupons',options)
                    // .map(res => res.json())
                    .subscribe(data => {
                        console.log(data.json());
                    },
                
                    err=>{
                        console.log("Error==="+err);
                    });
    }
    preAssesmentQuestions()
    {
       this.preQuestions=[{id:1,question:"Which One is High Level Language?",options:[{id:1,option:"C++"},{id:2,option:"Assembly language"},{id:3,option:"Javascript"}]},
                           {id:2,question:"What is part of a database that holds only one type of information?",
                           options:[{id:1,option:"Report"},{id:2,option:"Field"},{id:3,option:"Record"}]},
                           {id:3,question:"'OS' computer abbreviation usually means?",options:[{id:1,option:"Order Of Significance"},{id:2,option:"Open Software"},{id:3,option:"Operating System"}]},
                           {id:4,question:"In which decade with the first transatlantic radio broadcast occur?",
                           options:[{id:1,option:"1850s"},{id:2,option:"1860s"},{id:3,option:"1870s"}]},
                           {id:5,question:"'.MOV' extension refers usually to what kind of file?",
                           options:[{id:1,option:"Image File"},{id:2,option:"Audio file"},{id:3,option:"MS Office Document"}]}]
      
       return this.preQuestions; 
        // var url="http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/products?oauth_consumer_key=ck_7525687356c29e539b2b44f0f774ea00bd62d1cc&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1507543601&oauth_nonce=DMewMB&oauth_version=1.0&oauth_signature=fG73/Z8dMicMfDmUIhWmAn7DLa4=";
        // // var url="http://nikola-breznjak.com/_testings/ionicPHP/api.php";
        // this.http.get(url)
        //       .map((res:Response) => res.json())
		// 	  .subscribe(data =>{
        //          this.preQuestions=data;
        //         //  this.events.publish('questions:fetch',this.preQuestions);
		// 		//  return userTypes;
		// 	  },
		// 	  err =>
		// 		{
		// 			var error = err;
        //             console.log(error);
        //             // this.events.publish('questions:fetch',false);
		// 			// this.showToast("Something Went Wrong Please try Again"+error);
		// 			// this.loader=false;
        // });                         
      

        //  var oauth = OAuth({
        //     consumer: {
        //         key: 'ck_7525687356c29e539b2b44f0f774ea00bd62d1cc',
        //         secret: 'cs_738d3244eaa72c90d6381fb8082baa90149247e1'
        //     },
        //     signature_method: 'HMAC-SHA1',
            
        //     hash_function: function(base_string, key){
        //         // return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
        //         return CryptoJS.createHmac('sha1', key).update(base_string).digest('base64');
        //     }
        // });

        //     var requestData = {
        //         url: 'http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/products',
        //         method: 'GET'
        //         // method:'POST',
                
        //     };
        //     let headers = new Headers({ 'Content-type': 'application/json' });
        //     let options = new RequestOptions({ headers: headers });
        //     this.http.get(
        //         requestData.url + '?' + jQuery.param(oauth.authorize(requestData))
        //         // .map((res:Response) => res.json())
        //     ).subscribe(data => {
        //         console.log(data.json());
        //     },
        
        //     err=>{
        //         console.log("Error==="+err);
        //     });
            // var body=[{
            //     'name': 'Premium Quality',
            // 'type' : 'simple',
            // 'regular_price': '21.99',
            // 'description' : 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
            // 'short_description' : 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
            //     }]
            
        //     this.http.get(requestData.url, body, options)
        //    .map((res: Response) => res.json())
        //    .subscribe(data=>{
        //        console.log("insert product:::="+data);
        //     },
        //     err=>{
        //         console.log("Error==="+err);
        //     });
           

    //      console.log("check");  
    //      var cs="cs_738d3244eaa72c90d6381fb8082baa90149247e1";
    //      var ck="ck_7525687356c29e539b2b44f0f774ea00bd62d1cc"
    //      var url='http://ecommerceapp.onlinewebshop.net/wp-json/wc/v2/products';
    //      var oauth =new  OAuth({
    //             consumer: {
    //                 key: 'ck_7525687356c29e539b2b44f0f774ea00bd62d1cc',
    //                 secret: 'cs_738d3244eaa72c90d6381fb8082baa90149247e1'
    //             },
    //             signature_method: 'HMAC-SHA1',
    //             hash_function: function(base_string, key) {
    //                 return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    //             }
    //         });

    //     var requestData = {
           
    //         method: 'GET'
    //     };
    //     var params = oauth.authorize(requestData);
    //     console.log(params);
    //     var restUrl=url+'/?oauth_signature='+ params.oauth_signature+ '&oauth_consumer_key='+ck+
    //         '&oauth_nonce='+params.oauth_nonce+
    //         '&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+params.oauth_timestamp+
    //         '&oauth_token='+params.oauth_token+'&oauth_version=1.0';
    //     this.http.get(restUrl).subscribe(data => {
    //         console.log("data==="+data);
    //     },
    //    err =>
    //     {
    //         var error = err;
    //         console.log("eroor::"+error);
    //         // this.events.publish('usertypes:fetch',false);
    //         // this.showToast("Something Went Wrong Please try Again"+error);
    //         // this.loader=false;
    //     });

        // return this.preQuestions;
    }

    selfAssesmentQuestions()
    {

    }

    finalAssesmentQuestions()
    {

    }

    getLatestJobs()
    {
        this.latestJobs=[{id:1,title:"Java Developer",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:2,title:".Net Developer",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:3,title:"UI Designer",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:4,title:"Php Developer",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:5,title:"MEAN Stack Developer",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:6,title:"Tester",descriptions:"Candidate Must Have 3+ Year Experience"},
                         {id:7,title:"Angular Developer",descriptions:"Candidate Must Have 3+ Year Experience"},                         
                        ]
        return this.latestJobs;
    }

    getJobsCategory()
    {
        var jobsCategory=[{id:1,name:"Jobs By Skills"},{id:2,name:"Jobs By Location"},{id:3,name:"Jobs By Company"}]
        return jobsCategory;
    }

    getJobRole(categoryId)
    {
        var jobRoleSelected=[];
        var jobRole=[{id:1,name:"Mixing",jobCategoryId:1},{id:2,name:"Lab Chemist",jobCategoryId:1},
        {id:3,name:"Computer operator",jobCategoryId:1},{id:4,name:"Lab Assistant",jobCategoryId:1},
        {id:5,name:"Delhi",jobCategoryId:2},{id:6,name:"Mumbai",jobCategoryId:2},
        {id:7,name:"Chennai",jobCategoryId:2},{id:8,name:"Gujrat",jobCategoryId:2},
        {id:9,name:"TechCraftz",jobCategoryId:3},{id:10,name:"HCL",jobCategoryId:3},
        {id:7,name:"DELL",jobCategoryId:3},{id:8,name:"Infosys",jobCategoryId:3}
        ]

        for(var i=0;i<jobRole.length;i++)
        {
            if(jobRole[i].jobCategoryId==categoryId)
                {
                    jobRoleSelected.push(jobRole[i]);
                }            
        }
       return jobRoleSelected;
    }
    setJobDetail(job)
    {
        this.jobDetail=job;
    }

    getJobDetail()
    {
        return this.jobDetail;
    }


    getTrainedWorkForce()
    {
       var trainedWorkForce=[{id:1,name:"Communication Skills"},{id:2,name:"Personal Ability"},
        {id:3,name:"Communication Skills"},{id:4,name:"Communication Skills"},
        {id:5,name:"Communication Skills"},{id:6,name:"Communication Skills"},
        {id:7,name:"Communication Skills"},{id:8,name:"Communication Skills"}
        
        ]
       return trainedWorkForce; 
    }
    getTrainings()
    {
        var trainings=[{id:1,name:"Communication Skills"},{id:2,name:"Personal Ability"},
        {id:3,name:"Communication Skills"},{id:4,name:"Communication Skills"},
        {id:5,name:"Communication Skills"},{id:6,name:"Communication Skills"},
        {id:7,name:"Communication Skills"},{id:8,name:"Communication Skills"}
        
        ]
       return trainings;
    }

    getCertifiedTrainers()
    {
        var trainers=[{id:1,name:"Himanshu",description:"He is Trainer For Java"},
                      {id:2,name:"Shahid",description:"He is Trainer For IOS Developement"},
                      {id:3,name:"Rahul",description:"He is Trainer For Css and Javascript"},
                      {id:4,name:"Yash",description:"He is Trainer For JQuery"},
                      {id:5,name:"Nakul",description:"He is Trainer For UI & UX"},
                      {id:6,name:"Manoj",description:"He is Trainer For R&D"},
                      {id:7,name:"Amit",description:"He is Trainer For Sql"}   
                     ];
        return trainers;                    
    }


    setCertifiedTrainer(info)
    {
        this.certifiedTrainer=info;
    }

    getCertifiedTrainer()
    {
        return this.certifiedTrainer;
    }

     getIndustryVisitedList()
    {
        var industriesList=[{id:1,name:"Industry Visited 1"},{id:2,name:"Industry Visited 2"},
        {id:3,name:"Industry Visited 3"},{id:4,name:"Industry Visited 4"},
        {id:5,name:"Industry Visited 5"}
        
        ]
       return industriesList;
    }

    setTrainingDetail(detail)
    {
        this.trainingDetail=detail
    }


    getTrainingDetail()
    {
        return this.trainingDetail;
    }


    setUser(userInfo)
    {
    //   this.nativeStorage.setItem('userType',userInfo)
    //     .then(
    //         () =>
    //             {
    //              var message="stored";
    //              this.showToast("stored user type")
    //             },
    //         error =>{
    //             var message="stored error user type="+error;
    //              this.showToast(message)
    //         } 
    //     );   
      this.user=userInfo;
    }

    getUserType()
    {
        this.nativeStorage.getItem('userType')
        .then
        (

            
            data =>
            {
                this.userTypeData=data;
                this.setUser(this.userTypeData);
            },
            error =>{

                return false;  
            } 
        );

        //  setTimeout(() => {
        //     return this.userTypeData;
        // }, 1000);
    }
     
    getUser()
    {
      return this.user;   
    } 
    
    getUserTypes()
    {
        var userTypes=[];

        
        // var userTypeUrl="http://newecommerce.onlinewebshop.net/wp-json/wc/v2/products/99?oauth_consumer_key=ck_d88d89348f2cdf607aeded2278ecab50c71df03b&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1507290792&oauth_nonce=TkGxoz&oauth_version=1.0&oauth_signature=u8PKKecsmb/LFlkpdUDJhEWkbbY=";
        // this.http.get(userTypeUrl)
		// 	  .map((res:Response) => res.json())
		// 	  .subscribe(data =>{
		// 		console.log(JSON.stringify(data));
                
        //          userTypes=data;
        //          this.events.publish('usertypes:fetch',userTypes);
		// 		//  return userTypes;
		// 	  },
		// 	  err =>
		// 		{
		// 			var error = err;
        //             console.log(error);
        //             this.events.publish('usertypes:fetch',false);
		// 			// this.showToast("Something Went Wrong Please try Again"+error);
		// 			// this.loader=false;
        //         });
    }
}