import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import Chart from 'chart.js';
import * as moment from 'moment';

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

  detalle: ResponseData;
  data_captura: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores
  ) {
    this.detalle = this.navParams.data;
    console.log("Detalle sensor: ", this.detalle.idSensor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensorDetallePage');
    this.loadDCaptura();
  }

  loadDCaptura() {
    var id = this.detalle.idSensor;
    this.sensores.getDataSensor(id).then(_data => {
      this.data_captura = _data;

      console.log("Capturados: ", this.data_captura);

      var list_data: Array<Number> = [];
      var list_label: Array<string> = [];
      this.data_captura.map((item, index) => {
        list_data.push(item.Dato);
        // list_label.push(moment(item.insertDate));
      })
      this.loadGraphics('line', list_label, list_data);
    })
  }

  loadGraphics(type: string, labels: Array<string>, data: Array<Number>) {
    try {
      var el1 = document.getElementById('idSensor_temperatura');
      // var myChart = 
      new Chart(el1, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: '# Datos',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

}
