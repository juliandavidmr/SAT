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

  // Atributos no propios del api
  ultimo: Number
}

@Injectable()
export class ServiceSensores {

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    console.log('Hello Sensores Provider');
  }

  getDataSensor(idSensor: Number): Promise<any[]> {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES_GET_DATA(idSensor))
      .map(res => res.json())
      .subscribe((data = []) => {
        return resolve(data);
      }))
  }

  getListSensores(): Promise<ResponseData[]> {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES)
      .map(res => res.json())
      .subscribe((data: ResponseData[] = []) => {
        this.setLocaldata(data,constants.KEY_SENSORES);
        return resolve(data);
      }, err => {
        // console.log("Error:", err);
        this.getLocaldata(constants.KEY_SENSORES).then(res => resolve(res))
      }))
  }

  /**
   * Almacena los datos de sensores en local
   * @param data 
   */
  setLocaldata(data: ResponseData[], key: string) {
    this.storage.ready().then(() => {
      this.storage.set(key, data);
    });
  }

  /**
   * Obtiene los datos de sensores en local
   */
  getLocaldata(key: string) {
    return this.storage.get(key);
  }


  /**
   * Listado de sensores asignados a una estación
   * @param id_estacion 
   */
  getListSensoresByEstacion(id_estacion: Number): Promise<ResponseData[]> {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES_BY_ESTACION(id_estacion))
      .map(res => res.json())
      .subscribe((data: ResponseData[] = []) => {
        // this.setLocaldata(data, );
        return resolve(data);
      }, err => {
        // console.log("Error:", err);
        // this.getLocaldata().then(res => resolve(res))
      }))
  }
}
