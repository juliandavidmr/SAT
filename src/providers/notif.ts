import { Injectable } from '@angular/core';
import { LocalNotifications } from 'ionic-native';

/*
  Generated class for the Notif provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Notif {

  constructor() {
    console.log('Hello Notif Provider');
  }

  public show(title: string, text: string, date?: Date, sound?: string) {
    LocalNotifications.schedule({
      title: title || "Notificación",
      text: text || "Delayed Notification",
      at: date || new Date(),
      sound: sound
    });
  }

  public eventClick(handler: Function, argvs?: any) {
    if (typeof handler === 'function') {
      LocalNotifications.on("click", (notification, state) => {
        handler.call(this, argvs, notification, state);
      });
    }
  }
}