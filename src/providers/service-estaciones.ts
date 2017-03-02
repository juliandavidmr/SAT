import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as constants from './constants';

/*
  Generated class for the ServiceEstaciones provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceEstaciones {

  constructor(public http: Http) {
    console.log('Hello ServiceEstaciones Provider');
  }

  getListEstaciones() {
    return new Promise((resolve, reject) => this.http.get(constants.URL_API_ESTACIONES).map(res => res.json()).subscribe((response: any = []) => resolve(response)));
  }

}