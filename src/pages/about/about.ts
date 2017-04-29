import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Notif } from '../../providers/notif';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public notif: Notif) {
    notif.eventClick(function (argvs, notification, state) {
      let alert = alertCtrl.create({
        title: "Notification Clicked",
        subTitle: "You just clicked the scheduled notification",
        buttons: ["OK"]
      });
      this.navCtrl.push(alert);
    }.bind(this));
  }

  public schedule() {
    this.notif.show("Alerta de riesgo", "Uno de los sensores ha registrado información alta")
  }
}