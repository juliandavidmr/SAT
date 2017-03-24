import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as constants from './constants';

export interface IEstacion {
  Descripcion: string
  Latitud: string
  Longitud: string
  Nombre: string
  idEstacion: Number
}

export interface ISensorConDato {
  idSensor: Number,
  NombreSensor: string,
  Referencia: string,
  Descripcion: string,
  Maximo: Number,
  Minimo: Number,
  Altura: Number,
  FK_idTipoSensor: Number,
  FK_idEstacion: Number,
  idEstacion: Number,
  Nombre: string,
  Descripcion1: string,
  Latitud: string,
  Longitud: string,
  idDato: Number,
  Dato: Number,
  insertDate: Date,
  uptdateDate: Date,
  FK_idSensor: Number,
  DateDato: Date,
  TimeDato: Date
}
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

  /**
   * Obtiene listado de estaciones
   */
  getListEstaciones(): Promise<IEstacion[]> {
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
   * Obtiene los sensores de cada estacion incluyendo el ultimo dato que se registro por el sensor
   * @param idEstacion 
   */
  getSensoresDatosByEstacion(idEstacion: Number): Promise<ISensorConDato[]> {
    return new Promise((resolve, reject) =>
      this.http.get(constants.URL_API_SENSORES_DATOS_BY_ESTACION(idEstacion))
        .map(res => res.json())
        .subscribe((data: ISensorConDato[] = []) => {
          return resolve(data)
        }, err => {
          // console.log("Error:", err);
          return reject(err);
        })
    );
  }

  /**
  * Almacena los datos de sensores en local
  * @param data 
  */
  private setLocaldata(data = []) {
    this.storage.ready().then(() => {
      this.storage.set(constants.KEY_ESTACIONES, data);
    });
  }

  /**
   * Obtiene los datos de sensores en local
   */
  private getLocaldata() {
    return this.storage.get(constants.KEY_ESTACIONES);
  }

}
