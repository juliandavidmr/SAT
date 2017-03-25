import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores } from '../../providers/service-sensores';
import { ISensorConDato } from '../../providers/service-estaciones';
import { Load } from '../../providers/load';
import Chart from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/es';

/*
  Generated class for the SensorDetalle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sensor-detalle',
  templateUrl: 'sensor-detalle.html'
})
export class SensorDetallePage {

  detalle: ISensorConDato;
  data_captura: any[] = [];
  ultimo: Number = 0;
  fecha_ultimo: string;   // Ej: hace 4 dias
  fecha_ultimo2: string;  // Ej: 2017-03-23 ...

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores,
    public load: Load
  ) {
    this.detalle = this.navParams.data;
    console.log("Dato date: ", this.detalle);

    if (this.detalle.insertDate != undefined) {
      this.setFecha(this.detalle.insertDate);
    }
    console.log("Detalle sensor: ", this.detalle.idSensor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorDetallePage');
    this.loadDCaptura();
  }

  setFecha(date: string | Date) {
    this.fecha_ultimo = moment(date).fromNow();
    this.fecha_ultimo2 = moment(date).format("MMM dddd hh:mm a");
  }

  loadDCaptura() {
    this.load.presentLoadingDefault();

    var id = this.detalle.idSensor;
    this.sensores.getDataSensor(id).then(_data => {
      this.data_captura = _data;

      console.log("Capturados: ", this.data_captura);

      var list_data: Array<Number> = [];
      var list_label: Array<string> = [];
      this.data_captura.map((item, index: Number) => {
        list_data.push(item.Dato);
        list_label.push(moment(item.insertDate).format("MMM dddd hh:mm a"));
      })
      // Obtiene la ultima fecha del dato capturado
      this.setFecha(this.data_captura[0].insertDate);

      // Obtiene el ultimo dato (Numero) capturado
      this.ultimo = list_data[0];

      if (list_data.length >= 20) {
        list_data = list_data.slice(0, 20);
        list_label = list_label.slice(0, 20);
      }
      list_data = list_data.reverse();
      list_label = list_label.reverse();

      // Element canvas bar
      var el1 = document.getElementById('grafica1');
      this.loadGraphics(el1, 'line', list_label, list_data, 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', false);

      // Element canvas line
      var el2 = document.getElementById('grafica2');
      this.loadGraphics(el2, 'radar', list_label, list_data, null, null, false);

      this.load.closeLoading();
    }).catch(err => {
      this.load.closeLoading();
    })
  }

  loadGraphics(element: any, type: string, labels: Array<string>, data: Array<Number>, backgroundColor?: string, borderColor?: string, beginAtZero?: Boolean) {
    try {
      // var myChart = 
      new Chart(element, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: 'Dato',
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

}
