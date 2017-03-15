import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as constants from './constants';

/*
  Generated class for the Sensores provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface ResponseData {
  Altura: Number
  Descripcion: string
  Descripcion1: string
  FK_idEstacion: Number
  FK_idTipoSensor: Number
  Icono: string
  Latitud: string
  Longitud: string
  Maximo: Number
  Minimo: Number
  Nombre: string
  NombreSensor: string
  NombreTipoSensor: string
  Referencia: string
  idEstacion: Number
  idSensor: Number
  idTipoSensor: Number
}

@Injectable()
export class ServiceSensores {

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello Sensores Provider');
  }

  getDataSensor(id: Number) {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES_GET_DATA(id))
      .map(res => res.json())
      .subscribe((data: ResponseData[] = []) => {
        return resolve(data);
      }))
  }

  getListSensores(): Promise<ResponseData[]> {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES)
      .map(res => res.json())
      .subscribe((data: ResponseData[] = []) => {
        this.setLocaldata(data);
        return resolve(data);
      }, err => {
        // console.log("Error:", err);
        this.getLocaldata().then(res => resolve(res))
      }))
  }

  /**
   * Almacena los datos de sensores en local
   * @param data 
   */
  setLocaldata(data: ResponseData[]) {
    this.storage.ready().then(() => {
      this.storage.set(constants.KEY_SENSORES, data);
    });
  }

  /**
   * Obtiene los datos de sensores en local
   */
  getLocaldata() {
    return this.storage.get(constants.KEY_SENSORES);
  }

}
