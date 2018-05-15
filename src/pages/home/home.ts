import { Component , ViewChild, ElementRef,NgZone} from '@angular/core';
import { NavController ,NavParams,ModalController } from 'ionic-angular';
import {Http, Response,Headers} from '@angular/http';
import {SessionService} from '../../app/sessionservice';
import 'rxjs/add/operator/map'
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { MyModalPage } from '../my-modal/my-modal';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private service:SessionService,public geolocation: Geolocation,public modalCtrl: ModalController,public ngZone: NgZone) {
  
  }

  ionViewDidLoad() { // Added this function to loadMap
    this.first=true;

    this.locations=[
    {"latitude":29.452291,"longitude":76.033107},
    {"latitude":28.47216,"longitude":77.072512},
    {"latitude":28.481315,"longitude":77.092888}
   ]
    this.loadMap();
  }
   
  loadMap() {
    if (navigator.geolocation) {
      var options = {
        enableHighAccuracy: true
      };
     
    
      navigator.geolocation.getCurrentPosition(position=> {
        console.info('using navigator');
        console.info(position.coords.latitude);
        console.info(position.coords.longitude);

        // initMap()

         this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // this.latLng = new google.maps.LatLng(this.locations[0].latitude,this.locations[0].longitude);

          // alert("lat lng:::"+this.latLng);
          this.currentLatLng=position.coords;
          let mapOptions = {
            center:this.latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          // alert("lat lng:::"+latLng);
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          
          var image={"url":"https://maps.gstatic.com/mapfiles/place_api/icons/civic_building-71.png","size": new google.maps.Size(50,50)}
          var marker = new google.maps.Marker({
            map: this.map,
            position:this.latLng,
            icon:image
          });

          // this.callPlaceServiceApi(position.coords.latitude, position.coords.longitude)
          
      }, error => {
        console.log(error);
      }, options);
    }
  }


  callPlaceServiceApi(lat,lng)
  {
          
          var playServiceUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAek88jq8wbLKl_760kRP_XNGpHQnObpmU&location="+lat +","+lng+"&radius=50000&type=atm";
          this.http.get(playServiceUrl)
          .map(val => val.json())
          .subscribe(data =>
             this.callback(data.results,data.status) 
            ),
            err =>alert("err:"+err)
             
  }
  callback(results, status) {
      var first=true;  
      // alert("bound::");  
      this.bounds = new google.maps.LatLngBounds(); 
      // alert("bounds=="+this.bounds);
      for (var i = 0; i < results.length; i++) {
          var R = 6371; // earth radius in km
          var x = (this.toRad(results[i].geometry.location.lng)-this.toRad(this.currentLatLng.longitude)) *
                  Math.cos((this.toRad(this.currentLatLng.latitude)+this.toRad(results[i].geometry.location.lat))/2);
          var y = (this.toRad(results[i].geometry.location.lat)-this.toRad(this.currentLatLng.latitude));
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

      // alert("showing");
      // this.modalShow()

      
      // alert(profileModal);

       this.ngZone.run(() => {
                
                // let profileModal = this.modalCtrl.create(MyModalPage,{placeName:place.name});
                // alert("sdfsdf"+profileModal)
                this.placeName=place.name;
                // alert(this.placeName);
                this.profileModal = this.modalCtrl.create(MyModalPage,{placeName:this.placeName});
                this.placeName=place.name;
                this.profileModal.present();
        });




    });
    
  }
  modalShow()
  {
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
                                  // alert("position::"+this.position);

                                    var geoCoder1= new google.maps.Geocoder();
                                    geoCoder1.geocode({
                                      'latLng': event.latLng
                                    }, function(results, status) {
                                      if (status == google.maps.GeocoderStatus.OK) {
                                        alert("LatLNG::"+position);
                                        if (results[1]) {
                                          // here assign the data to asp lables
                                          // document.getElementById('<%=addressStandNo.ClientID %>').value = results[1].formatted_address;
                                          alert("Address::"+results[1].formatted_address)
                                        } else {
                                          alert('No results found');
                                        }
                                      } else {
                                        alert('Geocoder failed due to: ' + status);
                                      }
                                    });
                              })
                      }    
                      bounds.extend(this.marker.getPosition());
    }

 

}
