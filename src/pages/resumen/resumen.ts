import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html'
})
export class ResumenPage {

  list_sensores: ResponseData[]
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumenPage');

    this.sensores.getListSensores().then((list: ResponseData[]) => {
      console.log("=>", list);
      
      this.list_sensores = list;
    })
  }

}
