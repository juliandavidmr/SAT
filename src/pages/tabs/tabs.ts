import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SensoresPage } from '../sensores/sensores';
import { EstacionesPage } from '../estaciones/estaciones';
import { LoginPage } from '../login/login';
import { MapaPage } from '../mapa/mapa';
import { ResumenPage } from '../resumen/resumen';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab3Root: any = SensoresPage;
  tab4Root: any = EstacionesPage;
  tab5Root: any = LoginPage;
  tabMapa: any = MapaPage;
  tabResumen: any = ResumenPage;
}
