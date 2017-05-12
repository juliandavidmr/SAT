import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Watchdog } from '../../providers/watchdog';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public WD: Watchdog) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
  }

}
