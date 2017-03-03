import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EstacioneDetallePage } from '../estacione-detalle/estacione-detalle';

import { ServiceEstaciones } from '../../providers/service-estaciones';
import { Load } from '../../providers/load';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public estacion_api: ServiceEstaciones,
    public load: Load
  ) {
    this.load.presentLoadingDefault();
    this.estacion_api.getListEstaciones().then(data => {
      this.list_estaciones = data;

      console.log('Estaciones: ', this.list_estaciones);
      this.load.closeLoading();
    }).catch(err => {
      this.load.closeLoading();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacionesPage');  
  }

  openDetalleEstacion(estacion_params: any) {
    this.navCtrl.push(EstacioneDetallePage, estacion_params);
  }

}
