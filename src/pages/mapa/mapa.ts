import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSensores } from '../../providers/service-sensores';
import { ServiceEstaciones, IEstacion } from '../../providers/service-estaciones';
import L from 'leaflet';
import moment from 'moment'

/*
  Generated class for the Mapa page.
*/
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  stylemap: string = 'height:80%;'
  map: any = {};
  center: Array<Number> = [
    1.719863, -75.634241
  ]
  zoom: Number = 11;

  public list_sensores = [];
  public list_estaciones: IEstacion[] = [];
  public list_sensores_bottom = []

  // Configuracion del mapa
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
    public sensores: ServiceSensores,
    public estaciones: ServiceEstaciones) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();

    this.loadEstaciones();
  }

  doRefresh(refresher) {
    console.log("Map element:", this.map);

    this.map.eachLayer(layer => {
      // console.log("Layer", layer);
      this.map.removeLayer(layer)
    })
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://200.21.7.94/sat">SAT Florencia</a> GIECOM'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
    this.loadEstaciones().then(() => refresher.complete())
  }


  /**
   * Carga las estacioens en el mapa
   */
  loadEstaciones() {
    return new Promise(resolve => {
      this.estaciones.getListEstaciones().then(list => {
        list.map((estacion, index) => {
          this.estaciones.getSensoresDatosByEstacion(estacion.idEstacion).then(list_sensores => {
            list_sensores.map(el => this.list_sensores.push(el));

            var html_li = [];
            list_sensores.forEach(item_sensor => {
              // console.log("Item:", item_sensor);

              html_li.push(`
              <li>
                ${item_sensor.NombreSensor}:           
                <strong>${item_sensor.Dato ? item_sensor.Dato : 0}</strong> |
                <small>${moment(item_sensor.insertDate).fromNow()}</small>
              </li>
            `)
            })
            const html_content = `
            ${estacion.Nombre} <br/>
            <ul>
              ${html_li.length > 0 ? html_li.join('') : '<li>Sin sensores</li>'}
            </ul>
          `;
            this.addMarker([
              parseFloat(estacion.Latitud),
              parseFloat(estacion.Longitud)],
              html_content
            );
          })
        })
        console.log("Listado de estaciones: ", list)
        return resolve(true);
      })
    })
  }

  /**
   * Carga el elemento del mapa
   */
  loadMap() {
    this.map = L.map('map').setView(this.center, this.zoom);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://200.21.7.94/sat">SAT Florencia</a> GIECOM'
    }).addTo(this.map);

    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

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
    let mark = L.marker(coord, { icon: this.greenIcon }).addTo(this.map)
      .bindPopup(message)
      .openPopup();

    mark.on('click', (event) => {
      console.log("Click", event);
      this.list_sensores_bottom = this.list_sensores.filter(it => {
        // console.log("Compare:", it.Latitud, event.latlng.lat);
        return it.Latitud == event.latlng.lat && it.Longitud == event.latlng.lng
      })
    })
  }
}