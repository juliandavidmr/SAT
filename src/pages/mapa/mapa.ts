import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores, ResponseData } from '../../providers/service-sensores';
import L from 'leaflet';

/*
  Generated class for the Mapa page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  map: any = {};
  center: Array<Number> = [
    1.6208841, -75.6051835
  ]
  zoom: Number = 13;

  public list_sensores: ResponseData[] = [];

  greenIcon = L.icon({
    iconUrl: 'assets/images/pin2.png',
    iconSize: [43, 45], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensores: ServiceSensores) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();

    this.loadSensores();
  }

  /**
   * Carga los sensores en el mapa
   */
  loadSensores() {
    console.log("Sensores:", this.list_sensores);
    this.sensores.getListSensores().then(data => {
      this.list_sensores = data;

      this.list_sensores.map((item, index) => {
        this.sensores.getLast(item.idSensor).then((count = 0) => {
          this.addMarker([
            parseFloat(item.Latitud),
            parseFloat(item.Longitud)
          ],
            `${item.Nombre}-${item.NombreSensor}<br/><strong>Ultimo dato: ${count}</strong>`
          );
        }).catch(err => {
          this.addMarker([
            parseFloat(item.Latitud),
            parseFloat(item.Longitud)],
            `${item.Nombre}-${item.NombreSensor}`
          );
        })
        console.log("Cargado sensor ", index, item);
      })
    })
  }

  /**
   * Carga el elemento del mapa
   */
  loadMap() {
    this.map = L.map('map').setView(this.center, this.zoom);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">SAT Florencia</a> GIECOM'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

    // Detecta cuando se hace click en el mapa
    this.map.on('click', (e) => {
      /*
      //marker Default
      let marker = L.marker(e.latlng)
        .bindPopup('Mensaje')
        .addTo(this.map)
        .openPopup();
      */
    });

    // Marcador por defecto
    // this.addMarker(this.center, 'Florencia, Caquetá');
  }

  /**
   * Añade un marcador al mapa
   * @param coord Coordenadas
   * @param message Mensaje a mostrar en popup
   */
  addMarker(coord: Array<Number | String>, message: string = 'Mensaje'): void {
    // L.marker([50.5, 30.5]).addTo(this.map);
    L.marker(coord, { icon: this.greenIcon }).addTo(this.map)
      .bindPopup(message)
      .openPopup();
  }
}