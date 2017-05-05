import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_API_DATOS_BY_FECHA_Y_SENSOR } from "../providers/constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceDatos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceDatos {

  constructor(public http: Http) {
    console.log('Hello ServiceDatos Provider');
  }

  getDatosBySensorFecha(fecha: Date, idsensor: number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL_API_DATOS_BY_FECHA_Y_SENSOR(fecha, idsensor))
        .map(res => res.json())
        .subscribe(res => { 
          return resolve(res) 
        }, err => reject(err))
    })
  }
}