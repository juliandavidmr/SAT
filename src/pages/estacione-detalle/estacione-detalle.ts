import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';

/*
  Generated class for the EstacioneDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-estacione-detalle',
  templateUrl: 'estacione-detalle.html'
})
export class EstacioneDetallePage {

  public detalle: any = [];
  public list_sensores: ResponseData[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores
  ) {
    this.detalle = this.navParams.data;

    console.log(this.detalle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');
    this.loadSensores();
  }

  loadSensores() {
    console.log(this.detalle.idEstacion);
    this.sensores.getListSensoresByEstacion(this.detalle.idEstacion).then((sens: ResponseData[]) => {
      this.list_sensores = sens;
      console.log("Sensores de la estacion " + this.detalle.idEstacion, sens)
    });
  }

  openDetalle(params) {
    this.navCtrl.push(SensorDetallePage, params)
  }
}