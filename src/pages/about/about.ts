import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
    LocalNotifications.on("click", (notification, state) => {
      let alert = alertCtrl.create({
        title: "Notification Clicked",
        subTitle: "You just clicked the scheduled notification",
        buttons: ["OK"]
      });
      this.navCtrl.push(alert);
    });
  }

  public schedule() {
    LocalNotifications.schedule({
      title: "Test Title",
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 5 * 1000),
      sound: null
    });
  }

}
