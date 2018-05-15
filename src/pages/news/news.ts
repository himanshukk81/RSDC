import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { NewsDetailPage } from '../news-detail/news-detail';
/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SessionService) {
  }

  ionViewDidLoad() {
     this.news=this.service.getTrainings();
    console.log('ionViewDidLoad NewsPage');
  }

  newsDetail()
  {
     this.navCtrl.push(NewsDetailPage, 
      {
       
      });
  }

}
