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

  public list_sensores: ResponseData[] = [];
  public lastUpdate: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apisensores: ServiceSensores,
    public load: Load,
    public date: DateMethod
  ) {
    this.loadData()
  }

  loadData() {
    this.load.presentLoadingDefault();
    this.apisensores.getListSensores().then(data => {
      this.list_sensores = data;

      console.log('Sensores: ', this.list_sensores);

      this.load.closeLoading();

      this.lastUpdate = Date.now();

      this.loadUltimoDato();
    }).catch((err: any) => {
      this.load.closeLoading(); // TODO: Hacer que la promesa getListSensores use el reject
    })
  }

  loadUltimoDato() {
    this.list_sensores.map((item, index) => {
      // console.log("Recorriendo sensor: ", this.list_sensores[index].idSensor);
      this.apisensores.getDataSensor(this.list_sensores[index].idSensor).then((result = []) => {
        // console.log("Datos del sensor ", this.list_sensores[index].idSensor, result);
        this.list_sensores[index].ultimo = result.length != 0? result[0].Dato: 0;
      }).catch(err => {
        console.log("Error: ", err)
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensoresPage');
  }

  openDetalle(params) {
    this.navCtrl.push(SensorDetallePage, params)
  }
}
