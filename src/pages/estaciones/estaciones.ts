import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EstacioneDetallePage } from '../estacione-detalle/estacione-detalle';

/*
  Generated class for the Estaciones page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-estaciones',
  templateUrl: 'estaciones.html'
})
export class EstacionesPage {

  public list_estaciones: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacionesPage');

    this.list_estaciones = [{
      id: 1,
      nombre: 'Sensor #',
      descripcion: 'Sensor de abc con xyz',
      fechacreado: Date.now()
    }, {
      id: 2,
      nombre: 'Sensor #',
      descripcion: 'Sensor de axxc con xxtz',
      fechacreado: Date.now()
    }];
  }

  openDetalleEstacion(estacion_params: any) {
    this.navCtrl.push(EstacioneDetallePage, estacion_params);
  }

}
