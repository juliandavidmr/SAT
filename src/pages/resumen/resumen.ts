import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import { ServiceDatos } from "../../providers/service-datos";


@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html'
})
export class ResumenPage {

  fecha: Date
  idsensor: number = 0
  list_sensores: ResponseData[] = [{
    Altura: 0,
    Descripcion: "Cargando",
    Descripcion1: "Cargando",
    FK_idEstacion: 0,
    FK_idTipoSensor: 0,
    Icono: "Cargando",
    Latitud: "",
    Longitud: "",
    Maximo: 0,
    Minimo: 0,
    Nombre: "Cargando",
    NombreSensor: "Cargando",
    NombreTipoSensor: "Cargando",
    Referencia: "Cargando",
    idEstacion: 0,
    idSensor: 0,
    idTipoSensor: 0,

    // Atributos no propios del api
    ultimo: 0
  }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores,
    public datos: ServiceDatos) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumenPage');

    this.loadSensores()
  }

  loadSensores() {
    this.sensores.getListSensores().then((list: ResponseData[]) => {
      console.log("=>", list);

      this.list_sensores = list;
    })
  }

  /**
   * Carga los datos despues de seleccionar la fecha y el sensor
   */
  loadSelectedDatos() {
    this.datos.getDatosBySensorFecha(this.fecha, this.idsensor)
  }
}
