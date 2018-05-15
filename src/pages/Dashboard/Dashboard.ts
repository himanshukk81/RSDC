import { Component , ViewChild, ElementRef,NgZone} from '@angular/core';
import { NavController, NavParams,ModalController,Platform } from 'ionic-angular';
import {Http, Response,Headers} from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { Assesments } from '../Assesments/Assesments';
import {SessionService} from '../../app/sessionservice';
import 'rxjs/add/operator/map'
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { MyModalPage } from '../my-modal/my-modal';
import { Diagnostic } from '@ionic-native/diagnostic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

declare var google:any;

@Component({
  selector: 'page-Dashboard',
  templateUrl: 'Dashboard.html'
})
export class Dashboard {

    deviceToken:any;
    locations=[];
    marker:any;
    geoCoder:any;
    first:boolean;
    bounds:any;    
    profileModal:any;  
    @ViewChild('map') mapElement: ElementRef; // Added
    map: any; // Added
    markers:any;
    latLng:any;
    currentLatLng:any;
    placeName:any;
    user:any;
    intervalId1:any;
    intervalId2:any;
    defaultLocation:any;
    loadMapFirst:boolean;
    userId:number=1;
    news:any;
    selectedImage:any;
    localStorageInfoFirst:boolean=true;
    // checkLocationFirst:any;
    myGroup:any;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private service:SessionService,public geolocation: Geolocation,
    public modalCtrl: ModalController,public ngZone: NgZone,public diagnostic: Diagnostic,public platform: Platform,public native:NativeStorage) {


      this.user={};
      this.defaultLocation={};
      this.first=true;
      this.currentLatLng={};
      this.loadMapFirst=true;
        this.myGroup = new FormGroup({
         placeAutofill: new FormControl()
        });
    }
    

      ionViewDidLoad() { // Added this function to loadMap
        
        ////alert("load Map")
        //this.loadMap();
        //this.destination.lat=28.4592693;
        //this.destination.lng=77.0702305;
        this.loadMap(28.4592693,77.0702305)

        // this.loadCurrentLocation()
          this.news=[{id:1,name:"It is a Long Established Fact that a reader will be distracted by readable content  of a page  when looking at its layout"},
          {id:2,name:"Rubber Skill Development Council(RSDC) has joined hands with Hindustan University"},
          {id:3,name:"Rubber Skill Development Council(RSDC), the sector skill Council For Rubber Sector in India"}
          ]

        if(this.service.getUser())
          {
             this.userId=this.service.getUser().id;
          }
          
          
          this.checkLocation()      
      }

      checkLocation()
      {

        this.platform.ready().then((readySource) => {
      
          this.diagnostic.isLocationEnabled().then(
          (isAvailable) => {
          console.log('Is available? ' + isAvailable);
          var mssg='Is available? ' + isAvailable;
          // //this.service.showToast(mssg);
          if(isAvailable)
            {

              clearInterval(this.intervalId1);   
              this.loadCurrentLocation();
            }
            else
            {
                
                if(this.localStorageInfoFirst)
                {
                  var userData;
                  this.native.getItem('userLocation')
                  .then
                  (
                      data =>
                      {
                          // 
                          userData=data;
                          //alert("location 102==="+JSON.stringify(userData));
                          this.user.lat=userData.lat;
                          this.user.lng=userData.lng;
                          this.user.address=userData.address;
                          this.loadMap(this.user.lat,this.user.lng);     
                          var message="userInfo="+JSON.stringify(userData);
                          console.log(data);
                          //this.service.showToast(message);
                      },
                      error =>{
                          var message="userError"+error;
                          //alert("error 121");
                          this.user.lat=28.445290;
                          this.user.lng=77.065081;
                          this.user.address="Gurugram";
                          if(this.first)
                          {
                            this.loadMap(this.user.lat,this.user.lng);     
                            this.first=false;
                            // var userLocation={"lat":this.defaultLocation.latitude,"lng":this.defaultLocation.longitude};  
                            // this.service.setUserLocation(userLocation);
                            
                          }      
                          //this.service.showToast("user error="+message);
                      } 

                  
                  );

                  this.localStorageInfoFirst=false;

                  this.intervalId1 = setInterval(() => {  
                            this.checkLocation();
                  }, 7000);
                }    
            

                
            }
          }).catch( (e) => {
          console.log(e);
          // //alert(JSON.stringify(e));
          });
        })
      } 
      loadCurrentLocation(){
          if (navigator.geolocation) {
            let optionsGPS = {timeout:4000,enableHighAccuracy: true};
              this.geolocation.getCurrentPosition(optionsGPS).then((position) => {
              
              clearInterval(this.intervalId2);   
              this.currentLatLng=position.coords; 
              // //this.service.showToast("lat lng 156");  

              // var obj={};
              // obj=position.coords;

              // //alert("location obj==="+JSON.stringify(obj));
              // //alert("location 165==>>>>>>>>."+obj);
              // console.log("location obj==="+JSON.stringify(obj));
              // console.log("location 168=>>>>>>>>>>>>>>>>>"+obj);
              // //alert("current location===>>"+JSON.stringify(this.currentLatLng));
              // console.log("current location===>>"+JSON.stringify(this.currentLatLng));

              // console.log("current lat::="+this.currentLatLng.latitude);

              this.getCurrentAddress(this.currentLatLng.latitude,this.currentLatLng.longitude);
              // this.loadMap(this.currentLatLng.latitude,this.currentLatLng.longitude);     
            }).catch((err) => {
              //  //alert("not"+err); 
               
              if(this.loadMapFirst)
                {
                  this.intervalId2 = setInterval(() => {  
                  // this.loadMap();
                      this.loadCurrentLocation();
                    }, 2000);
                  this.loadMapFirst=false;
                }
                
            });
        }
                  // if(this.currentLatLng)
                  //   {
                  //     //this.service.showToast("found current location");
                  //     clearInterval(this.intervalId);    
                  //     this.loadMap(this.currentLatLng.latitude,this.currentLatLng.longitude);     
                  //   }
                  //   else
                  //     {
                  //       clearInterval(this.intervalId);    
                        
                  //         //this.service.showToast("not found current location");
                  //         this.defaultLocation.latitude=28.445290;
                  //         this.defaultLocation.longitude=77.065081;

                  //         if(this.first)
                  //         {
                  //           this.loadMap(this.defaultLocation.latitude,this.defaultLocation.longitude);     
                  //           this.first=false;
                  //         }
                  //             this.intervalId = setInterval(() => {  
                  //               // this.loadMap();
                  //               this.ionViewDidLoad();
                  //             }, 7000);
                  //     }
      

     }

    getCurrentAddress(lat, lng) {
        this.user.lat=lat;
        this.user.lng=lng;
        var userAddress;
        // var lat;
        // var lng;

        // //alert("user info lat lng=="+JSON.stringify(this.user));
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();

        // geocoder.geocode({'latLng': latlng}, function(results, status) {
        geocoder.geocode({'latLng': latlng},(results, status) => {

          if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
            if (results[1]) {
                    //alert(results[0].formatted_address)
                    // console.log("Address=="+results[0].formatted_address);
                    userAddress=results[0].formatted_address;

                    // //alert("user Address=="+userAddress);
                    console.log("user address 1=="+JSON.stringify(results[0])); 
                    // //alert("user info==="+JSON.stringify(this.user));
                    // this.user.address=results[0].formatted_address;
                    // //alert("user info=="+JSON.stringify(this.user));
                    this.loadMapAfter(userAddress)
                    // this.loadMap(12232,233333);
            }
          } 

          else{
            //alert("something went Wrong==");
          }
        });
    }  

   loadMapAfter(userAddress)
        {

          //alert("come in 257");
          // //alert("lat="+lat+"Lng="+lng+"Address="+userAddress)

          this.ngZone.run(() => {
              this.user.address=userAddress;
          });
          

          //alert("user Location="+JSON.stringify(this.user));
          this.loadMap(this.user.lat,this.user.lng)
        }
      


      loadMap(lat,lng)
      {
        //alert("lat "+lat+"lng "+lng)
        
        // this.service.setUserLocation(userLocation);
        this.latLng = new google.maps.LatLng(lat,lng);

        //alert("user data 252"+JSON.stringify(this.user));
        
        this.service.setUserLocation(this.user);
        let mapOptions = {
                    center:this.latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                  }
                  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                  

                  // //alert("Map==>"+this.map)
                  var places= document.getElementById('googlePlaces').getElementsByTagName('input')[0];
                  // //alert("Address=>"+places);
                  let autocomplete = new google.maps.places.Autocomplete(places, {types: ['geocode']});
                  google.maps.event.addListener(autocomplete, 'place_changed', () => {
                    // retrieve the place object for your use
                    let place = autocomplete.getPlace();
                    var mssg=place.geometry.location.lat;

                    // //alert("mssg==="+mssg);
                    // //this.service.showToast(mssg);

                    // //alert("place changed=="+JSON.stringify(place));

                    // console.log("selected Places =>>>>>>>>>>>>>>>>>>"+JSON.stringify(place));
                    this.user={"lat":place.geometry.location.lat(),"lng":place.geometry.location.lng(),"address":place.address_components[0].long_name}; 
                    //alert("user Address===>"+JSON.stringify(this.user)); 
                    this.loadMap(place.geometry.location.lat(),place.geometry.location.lng());
                    

                    console.log("places++>>>>>>>>>>>>>>"+JSON.stringify(this.user));
                    // //this.service.showToast("Address==>"+JSON.stringify(this.user));
                    // this.service.setUserLocation(this.user);
                    // console.log("places api++>>>>>>>>>>>>>>>>>>>>>>>>>........"+JSON.stringify(mssg));
                  });
                  
                  var marker = new google.maps.Marker({
                    map: this.map,
                    position:this.latLng,
                    icon:"assets/icon/user5.png"
                   
                  });
                
                  this.callPlaceServiceApi(lat,lng)
      }


      callPlaceServiceApi(lat,lng)
      {
              
              var playServiceUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAek88jq8wbLKl_760kRP_XNGpHQnObpmU&location="+lat +","+lng+"&radius=50000&type=atm";
              this.http.get(playServiceUrl)
              .map(val => val.json())
              .subscribe(data =>
                this.callback(data.results,data.status,lat,lng) 
                ),
                err =>
                
                {
                  // alert("err:"+err) 
                }
                
                
      }
          
      callback(results, status,lat,lng) {
          var first=true;  
          // //alert("bound::");  
          this.bounds = new google.maps.LatLngBounds(); 
          // //alert("bounds=="+this.bounds);
          for (var i = 0; i < results.length; i++) {
              var R = 6371; // earth radius in km
              var x = (this.toRad(results[i].geometry.location.lng)-this.toRad(lng)) *
                      Math.cos((this.toRad(lat)+this.toRad(results[i].geometry.location.lat))/2);
              var y = (this.toRad(results[i].geometry.location.lat)-this.toRad(lat));
              var distance= Math.sqrt(x*x + y*y) * R;


                
              if(distance<=20)
                {
                  this.createMarker(results[i]); 
                }
            }
          this.map.fitBounds(this.bounds);      
      }
      toRad(value) {
          return value * Math.PI / 180;
          }
  
  
      createMarker(place) {
        var placeLoc = place.geometry.location;
        var dest = new google.maps.LatLng(placeLoc.lat,placeLoc.lng);
        var marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location
        });

        this.bounds.extend(marker.getPosition());
        
        google.maps.event.addListener(marker, 'click', () => {

          // var infowindow = new google.maps.InfoWindow();
          // infowindow.setContent(place.name);
          // infowindow.open(this.map, this);

          // //alert("showing");
          // this.modalShow()

          
          // //alert(profileModal);

          this.ngZone.run(() => {
                    
                    // let profileModal = this.modalCtrl.create(MyModalPage,{placeName:place.name});
                    // //alert("place::"+JSON.stringify(place));
                    this.placeName=place.name;
                    // //alert(this.placeName);
                    this.profileModal = this.modalCtrl.create(MyModalPage,{placeName:this.placeName});
                    this.placeName=place.name;
                    this.profileModal.present();
            });
        });
        
      }
      addMarker() 
      {                   // To Add Marker
                        var position;
                        var bounds = new google.maps.LatLngBounds();
                        for(var i=0;i<this.locations.length;i++)
                        {
                          this.marker = new google.maps.Marker({
                            map: this.map,
                            animation: google.maps.Animation.DROP,
                            position: new google.maps.LatLng(this.locations[i].latitude,this.locations[i].longitude)
                            });
                                google.maps.event.addListener(this.marker, "click", function (event) {
                                    var latitude = this.position.lat();
                                    var longitude = this.position.lng();
                                    // //alert("position::"+this.position);

                                      var geoCoder1= new google.maps.Geocoder();
                                      geoCoder1.geocode({
                                        'latLng': event.latLng
                                      }, function(results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                          //alert("LatLNG::"+position);
                                          if (results[1]) {
                                            // here assign the data to asp lables
                                            // document.getElementById('<%=addressStandNo.ClientID %>').value = results[1].formatted_address;
                                            //alert("Address::"+results[1].formatted_address)
                                          } else {
                                            //alert('No results found');
                                          }
                                        } else {
                                          //alert('Geocoder failed due to: ' + status);
                                        }
                                      });
                                })
                        }    
                        bounds.extend(this.marker.getPosition());
      }
      takeTest()
      {
        this.navCtrl.push(Assesments, 
        {
        
        });
      }

}
