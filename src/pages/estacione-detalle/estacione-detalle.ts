import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js'

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("Chart:", Chart);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstacioneDetallePage');
    this.loadGraphics();
  }

  loadGraphics() {
    try {
      var el1 = document.getElementById('idSensor_temperatura');
      var myChart = new Chart(el1, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
