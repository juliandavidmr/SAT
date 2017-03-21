import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';

import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import { Load } from '../../providers/load';
import { DateMethod } from '../../providers/date';

/*
  Generated class for the Sensores page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sensores',
  templateUrl: 'sensores.html'
})
export class SensoresPage {

  public list_sensores: ResponseData[] = []; // Listado de sensores
  public lastUpdate: any;                    // Guarda la ultima fecha en que se consultaron los sensores

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apisensores: ServiceSensores,
    public load: Load,
    public date: DateMethod
  ) {
    this.loadData()
  }

  /**
   * Detecta gesto de refrescar Listado
   * @param refresher 
   */
  doRefresh(refresher) {
    this.loadData().then(_ => refresher.complete());
  }

  /**
   * Carga los datos del API
   */
  loadData() {
    return new Promise((resolve) => {
      this.load.presentLoadingDefault();
      this.apisensores.getListSensores().then(data => {
        this.list_sensores = data;

        console.log('Sensores: ', this.list_sensores);

        this.load.closeLoading();

        this.lastUpdate = Date.now();

        this.loadUltimoDato();

        return resolve(true);
      }).catch((err: any) => {
        this.load.closeLoading(); // TODO: Hacer que la promesa getListSensores use el reject

        return resolve(true);
      })
    })
  }

  /**
   * Consulta el ultimo dato registrado por cada sensor
   */
  loadUltimoDato() {
    this.list_sensores.map((item, index) => {
      this.apisensores.getLast(item.idSensor).then(count => {
        this.list_sensores[index].ultimo = count;
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensoresPage');
  }

  openDetalle(params) {
    this.navCtrl.push(SensorDetallePage, params)
  }
}
