import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as constants from './constants';

/*
  Generated class for the ServiceEstaciones provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceEstaciones {

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello ServiceEstaciones Provider');
  }

  getListEstaciones() {
    return new Promise((resolve, reject) => this.http.get(constants.URL_API_ESTACIONES)
      .map(res => res.json())
      .subscribe((data: any = []) => {
        this.setLocaldata(data);
        return resolve(data)
      }, err => {
        // console.log("Error:", err);
        this.getLocaldata().then(res => resolve(res))
      }));
  }

  /**
  * Almacena los datos de sensores en local
  * @param data 
  */
  setLocaldata(data = []) {
    this.storage.ready().then(() => {
      this.storage.set(constants.KEY_ESTACIONES, data);
    });
  }

  /**
   * Obtiene los datos de sensores en local
   */
  getLocaldata() {
    return this.storage.get(constants.KEY_ESTACIONES);
  }

}
