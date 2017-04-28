import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores } from '../../providers/service-sensores';
import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';
import { ServiceEstaciones, ISensorConDato } from '../../providers/service-estaciones';
import { Load } from '../../providers/load';

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
  public list_sensores: ISensorConDato[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores,
    public estaciones: ServiceEstaciones,
    public load: Load
  ) {
    this.detalle = this.navParams.data;

    console.log('Estacion detalle:', this.detalle);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.loadSensores().then(_ => {
      refresher.complete();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');
    this.loadSensores();
  }

  loadSensores() {
    return new Promise((resolve, reject) => {
      this.load.presentLoadingDefault();
      console.log(this.detalle.idEstacion);
      this.estaciones.getSensoresDatosByEstacion(this.detalle.idEstacion).then((sens) => {
        this.list_sensores = sens;
        console.log("Sensores de la estacion " + this.detalle.idEstacion, sens);

        // this.list_sensores[0].Referencia

        this.load.closeLoading();
        return resolve(true);
      }).catch(err => {
        this.load.closeLoading();
        return resolve(true);
      })
    })
  }

  openDetalle(params) {
    this.navCtrl.push(SensorDetallePage, params)
  }
}