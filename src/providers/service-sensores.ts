import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as constants from './constants';

/*
  Generated class for the Sensores provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
interface ResponseData {
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

  constructor(public http: Http) {
    console.log('Hello Sensores Provider');
  }

  getListSensores() {
    return new Promise((resolve) => this.http.get(constants.URL_API_SENSORES).map(res => res.json()).subscribe((data: ResponseData[] = []) => resolve(data)))
  }

}
