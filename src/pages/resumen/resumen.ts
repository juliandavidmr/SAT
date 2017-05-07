import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import { ServiceDatos, IResumen } from "../../providers/service-datos";
import Chart from 'chart.js';
import moment from 'moment';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html'
})
export class ResumenPage {

  @ViewChild('grafica') canvas: ElementRef;
  fecha: Date
  idsensor: number = 0;
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
    public sensores: ServiceSensores,
    public datos: ServiceDatos,
    private toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumenPage');

    this.loadSensores()
  }

  loadResumen() {
    console.log("Cargando resumen de:", this.fecha, this.idsensor)
    this.datos.getDatosBySensorFecha(this.fecha, this.idsensor).then(data => {
      console.log("Resumen:", data)

      this.loadCanvas(data)
    })
  }

  loadCanvas(resumen: IResumen[]) {
    if (resumen.length > 0) {
      let labels = []
      let data = [];

      resumen.map(it => {
        labels.push(moment(it.insertDate).format("MMM dddd hh:mm a"));
        data.push(it.Peso)
      })
      console.log('Canvas:', this.canvas)
      this.loadGraphics(this.canvas, 'line', labels, data, null, null, true)
    } else {
      this.presentToast('Sin datos a mostrar')
      console.log("Sin datos en resumen.")
    }
  }

  /**
   * Carga un listado de sensores.
   * Usado para llenar el elemento de seleccion de sensores.
   */
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

  loadGraphics(element: ElementRef, type: string, labels: Array<string>, data: Array<Number>, backgroundColor?: string, borderColor?: string, beginAtZero?: Boolean) {
    try {
      // var myChart = 
      new Chart(element.nativeElement, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: 'Resumen',
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: (beginAtZero == null) ? beginAtZero : false
              }
            }],
            xAxes: [{
              display: false
            }]
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  presentToast(message: string, time: number = 3000, position: string = 'bottom') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}