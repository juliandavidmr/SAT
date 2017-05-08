import { Injectable } from '@angular/core';
import { ServiceSensores, ResponseData } from './service-sensores';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Notif } from './notif';


/**
 * Estructura de las notificacioens mostradas
 */
export interface INotificaciones {
  title: string    // Titulo que se mostró
  text: string     // Texto que se mostró
  date: string     // Fecha en que se mostró
}

@Injectable()
export class Watchdog {

  private interval_watch: number = 5000;     // Intervalo en el que se revisa los datos
  private list_notificaciones: INotificaciones[] = [];   // Almacena temporalmente todas las notificaciones mostradas
  private last_notif: any;            // Almacena la fecha de la ultima notificacion mostrada

  constructor(
    public sensores: ServiceSensores,
    private backgroundMode: BackgroundMode,
    public notif: Notif) {
    console.log('Hello Watchdog Provider');
  }

  /**
   * Activa la funcionalidad de segundo plano
   */  
  enable(): void {
    if (!this.backgroundMode.isEnabled()) {
      this.backgroundMode.enable();
    }
  }

  /**
   * Corre un proceso en segundo plano que se ejecuta cada cierto tiempo.
   * Se mostrará una notificacion cada vez que un dato anormal sea encontrado.
   * Un dato anormal es un registro que está fuera del rango estable del sensor.
   */
  start(): void {
    setInterval(function () {
      this.findWarns();
    }.bind(this), this.interval_watch);
  }

  /**
   * Consulta el API y analiza los valores capturados por los sensores.
   */
  findAlertas(): void {
    this.sensores.getListSensores().then((res: ResponseData[] = []) => {
      if (res) {
        res.map((item, index) => {
          const id = item.idSensor;

          this.sensores.getDataSensor(id).then(_list => {
            // console.log("Datos consultados del sensor", id, _list)
            let state = this.range(item.Maximo, item.Minimo, _list);
            switch (state.out) {
              case 1:
                if (this.isUpper()) {
                  this.notif.show(item.Nombre, state.msg);
                  this.last_notif = moment().toDate();
                }
                break;
              case 2:
                if (this.isUpper()) {
                  this.notif.show(item.Nombre, state.msg);
                  this.last_notif = moment().toDate();
                }
                break;
              default:
                break;
            }
          });
        });
      }
    });
  }

  /**
   * 0 - Normal
   * 1 - Valor sobrepasado
   * 2 - Valor muy bajo
   * @param min valor minimo que puede tomar el sensor
   * @param max valor maximo que puede tomar el sensor
   * @param list listado de datos
   */
  private range(min: Number, max: Number, list = []) {
    if (min == 0 && max == 0 || list.length == 0) {
      return {
        out: 0,
        msg: ""
      };
    } else {
      list.forEach(element => {
        if (element.Dato >= max) {
          return {
            out: 1,
            msg: `Dato ${element.Dato}. Este sensor está capturando datos muy altos`
          };
        } else if (element.Dato <= min) {
          return {
            out: 2,
            msg: `Dato ${element.Dato}. Este sensor está capturando datos que se encuentran por bajo del rango establecido.`
          };
        }
      });
    }
  }

  /**
   * True - Se puede mostrar una notificaicon. \n
   * False - No se puede mostrar notificacion porque en menos de 30 minutos ya se mostró una
   */
  isUpper() {
    if (this.list_notificaciones.length != 0) {

    }
    if (this.last_notif != null) {
      let interval = moment().subtract(this.last_notif).minutes();  // Minutos
      return interval > 30;     // Se muestra una notificacion si ya se mostro una anteriormente hace 30 Minutos}
    }
    return false;
  }
}
