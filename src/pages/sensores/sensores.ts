import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';

import { ServiceSensores } from '../../providers/service-sensores';
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

  public list_sensores: any = [];
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
    }).catch((err) => {
      this.load.closeLoading(); // TODO: Hacer que la promesa getListSensores use el reject
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensoresPage');
  }

  openDetalle(params) {
    this.navCtrl.push(SensorDetallePage, params)
  }
}
