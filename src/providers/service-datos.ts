import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_API_DATOS_BY_FECHA_Y_SENSOR } from "../providers/constants";
import 'rxjs/add/operator/map';

export interface IResumen {
  Desv: number
  FK_idSensor: number
  Hora: number
  NombreSensor: string
  Peso: number
  Varianza: number
  insertDate: string | Date
}


@Injectable()
export class ServiceDatos {

  constructor(public http: Http) {
    console.log('Hello ServiceDatos Provider');
  }

  /**
   * Obtiene un resumen de datos segun un sensor y una fecha
   */
  getDatosBySensorFecha(fecha: Date, idsensor: number): Promise<IResumen[]> {
    return new Promise((resolve, reject) => {
      this.http.get(URL_API_DATOS_BY_FECHA_Y_SENSOR(fecha, idsensor))
        .map(res => res.json())
        .subscribe(res => {
          return resolve(res)
        }, err => reject(err))
    })
  }  
}