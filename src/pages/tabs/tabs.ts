import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { DatosPage } from '../datos/datos';
import { EstacionesPage } from '../estaciones/estaciones';
import { LoginPage } from '../login/login';
import { MapaPage } from '../mapa/mapa';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = DatosPage;
  tab4Root: any = EstacionesPage;
  tab5Root: any = LoginPage;
  tabMapa: any = MapaPage;
}
